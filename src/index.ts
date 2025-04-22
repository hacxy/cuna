import { input } from '@inquirer/prompts';
import { cac } from 'cac';

import clipboard from 'clipboardy';
import pkg from '../package.json';
import { handleTranslateText } from './openAI';

export async function bootstrap() {
  const cli = cac(pkg.name);

  cli.command('', '打开翻译输入框').action(async () => {
    const result = await input({
      default: '',
      message: '请输入需要翻译的内容：',
    });

    await handleTranslateText(result);
  });

  cli.command('clip', '从剪切板中读取内容直接翻译').alias('c').action(async () => {
    const text = clipboard.readSync();
    await handleTranslateText(text);
  });

  cli.version(pkg.version);
  cli.help();
  cli.parse(process.argv);
}

bootstrap();
