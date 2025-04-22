import OpenAI from 'openai';

const client = new OpenAI({
  baseURL: 'https://api.siliconflow.cn/v1/',
  apiKey: 'sk-pfhvptbcokshgosuefkdkvevizwqeyrzltgkzkkjijcbemhk'

});

export async function handleTranslateText(text: string) {
  const translateChat = await client.chat.completions.create({
    model: 'Qwen/Qwen2.5-7B-Instruct',
    stream: true,
    messages: [
      { role: 'system', content: '你是一个专业的AI翻译工具，你接收到的所有内容都需要进行翻译，你接受到的每一段话都需要判断是中文还是英文，如果既有中文也有英文，则根据这段话英文偏多还是中文偏多来决定翻译成什么，如果是纯英文，则翻译为中文，如果为中文，则翻译为英文' },
      { role: 'user', content: text }
    ]
  });

  // let finalContent = '';
  for await (const event of translateChat) {
    if (event.choices[0].finish_reason !== 'stop') {
      const content = event.choices[0].delta.content || '';
      // console.log(event);
      // finalContent += content || '';
      process.stdout.write(content);
    }
  }
  console.log('\n');
}

