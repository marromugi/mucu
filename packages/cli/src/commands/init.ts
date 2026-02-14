import { Command } from 'commander';
import prompts from 'prompts';
import pc from 'picocolors';
import { getDefaultConfig, writeConfig } from '../utils/config.js';
import { copyUtilities, copyStyles } from '../utils/registry.js';
import type { MucuConfig } from '../types/index.js';

export const init = new Command()
  .name('init')
  .description('Initialize mucu in your project')
  .option('-y, --yes', 'Skip prompts and use defaults')
  .option('-c, --cwd <path>', 'Working directory', process.cwd())
  .action(async (options) => {
    console.log(pc.cyan('Initializing mucu...\n'));

    let config: MucuConfig;

    if (options.yes) {
      config = getDefaultConfig();
    } else {
      const response = await prompts([
        {
          type: 'text',
          name: 'componentsDir',
          message: 'Where should components be installed?',
          initial: 'src/components/ui'
        },
        {
          type: 'text',
          name: 'libDir',
          message: 'Where should utilities be installed?',
          initial: 'src/lib'
        },
        {
          type: 'text',
          name: 'stylesDir',
          message: 'Where should global styles be placed?',
          initial: 'src/styles'
        },
        {
          type: 'text',
          name: 'iconsDir',
          message: 'Where should icons be installed?',
          initial: 'src/components/icons'
        },
        {
          type: 'confirm',
          name: 'typescript',
          message: 'Use TypeScript?',
          initial: true
        }
      ]);

      config = {
        componentsDir: response.componentsDir,
        libDir: response.libDir,
        stylesDir: response.stylesDir,
        iconsDir: response.iconsDir,
        typescript: response.typescript,
        aliases: {
          components: '@/components/ui',
          lib: '@/lib',
          icons: '@/components/icons'
        }
      };
    }

    await writeConfig(options.cwd, config);
    console.log(pc.green('  Created mucu.config.json'));

    await copyUtilities(options.cwd, config);
    console.log(pc.green('  Copied utilities'));

    await copyStyles(options.cwd, config);
    console.log(pc.green('  Copied styles'));

    console.log(pc.green('\nmucu initialized successfully!'));
  });
