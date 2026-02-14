import { Command } from 'commander';
import pc from 'picocolors';
import { fetchRegistry } from '../utils/registry.js';

export const list = new Command()
  .name('list')
  .description('List available components')
  .action(async () => {
    const registry = await fetchRegistry();

    console.log(pc.cyan('\nAvailable components:\n'));

    for (const item of registry.items) {
      console.log(`  ${pc.green(item.name.padEnd(15))} ${pc.gray(item.description)}`);
    }

    console.log();
  });
