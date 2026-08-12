/**
 * @ Author: zhanchao.wu
 * @ Create Time: 2026-08-12 14:06:13
 * @ Modified by: zhanchao.wu
 * @ Modified time: 2026-08-12 17:35:07
 * @ Description:
 */

import chalk from 'chalk'; // 可选，用于美化打印红字

export function fail(message: string, code = 1): never {
  console.error(chalk.red(`[Error] \n ✖ ${message} \n`));
  process.exit(code);
}

export const logSuccess = (filePath: string) => {
  console.log(`${chalk.green('✔')} \n ${chalk.green(filePath)}`);
};
