import { Command } from 'commander';
import { init } from './commands/init.js';
import { add } from './commands/add.js';
import { list } from './commands/list.js';
import { icon } from './commands/icon.js';

const program = new Command();

program
  .name('mucu')
  .description('Add React components to your project')
  .version(process.env.PACKAGE_VERSION ?? '0.0.0');

program.addCommand(init);
program.addCommand(add);
program.addCommand(list);
program.addCommand(icon);

program.parse();
