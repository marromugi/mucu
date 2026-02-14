import { Command } from 'commander';
import prompts from 'prompts';
import pc from 'picocolors';
import { getConfig } from '../utils/config.js';
import { fetchRegistry, copyComponentToProject } from '../utils/registry.js';
import { resolveComponentDependencies } from '../utils/resolver.js';

export const add = new Command()
  .name('add')
  .description('Add components to your project')
  .argument('[components...]', 'Components to add')
  .option('-y, --yes', 'Skip confirmation')
  .option('-o, --overwrite', 'Overwrite existing files')
  .option('-a, --all', 'Add all components')
  .option('-c, --cwd <path>', 'Working directory', process.cwd())
  .action(async (components: string[], options) => {
    const config = await getConfig(options.cwd);
    if (!config) {
      console.log(pc.red('No mucu.config.json found. Run "mucu init" first.'));
      process.exit(1);
    }

    const registry = await fetchRegistry();

    if (options.all) {
      components = registry.items.map(item => item.name);
    }

    if (components.length === 0) {
      const response = await prompts({
        type: 'multiselect',
        name: 'components',
        message: 'Select components to add',
        choices: registry.items.map(item => ({
          title: item.name,
          value: item.name,
          description: item.description
        }))
      });
      components = response.components || [];
    }

    if (components.length === 0) {
      console.log(pc.yellow('No components selected.'));
      return;
    }

    const resolved = resolveComponentDependencies(components, registry);

    console.log(pc.cyan(`\nAdding ${resolved.length} component(s)...`));

    if (!options.yes) {
      const { confirm } = await prompts({
        type: 'confirm',
        name: 'confirm',
        message: `Add: ${resolved.join(', ')}?`,
        initial: true
      });
      if (!confirm) process.exit(0);
    }

    for (const componentName of resolved) {
      await copyComponentToProject(componentName, config, {
        overwrite: options.overwrite,
        cwd: options.cwd
      });
      console.log(pc.green(`  + ${componentName}`));
    }

    console.log(pc.green('\nComponents added successfully!'));
  });
