import { Command } from 'commander';

import { generatePage } from './commands/generate';

const program = new Command();

program.name('wzc').description('WZC Next CLI');

program
  .command('g')
  .description('generate code [name]=[/:path,-:分词] [template]=[table/form]')
  .command('page <name> <template> <title>')
  .description('generate next page')
  .action(async (name, template, title) => {
    await generatePage(name, template, title);
  });

program.parse();
