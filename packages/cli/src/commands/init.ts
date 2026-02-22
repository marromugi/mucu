import { Command } from 'commander';
import prompts from 'prompts';
import pc from 'picocolors';
import { getDefaultConfig, writeConfig } from '../utils/config.js';
import { copyUtilities, copyStyles } from '../utils/registry.js';
import { detectAliasPrefix } from '../utils/tsconfig.js';
import type { MucuConfig } from '../types/index.js';

export const init = new Command()
  .name('init')
  .description('Initialize mucu in your project')
  .option('-y, --yes', 'Skip prompts and use defaults')
  .option('-c, --cwd <path>', 'Working directory', process.cwd())
  .action(async (options) => {
    console.log(pc.cyan('Initializing mucu...\n'));

    let config: MucuConfig;

    const detectedPrefix = await detectAliasPrefix(options.cwd);

    if (options.yes) {
      config = getDefaultConfig();
      if (detectedPrefix) {
        config.aliases = {
          components: `${detectedPrefix}components/ui`,
          lib: `${detectedPrefix}lib`,
          icons: `${detectedPrefix}components/icons`,
        };
      }
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

      const prefix = detectedPrefix ?? '@/';

      if (detectedPrefix) {
        console.log(pc.cyan(`\n  Detected path alias prefix: ${pc.bold(detectedPrefix)}`));
      } else {
        console.log(pc.yellow('\n  No path aliases detected in tsconfig.json'));
        console.log(pc.dim('  Using @/ as default prefix. You can change this in mucu.config.json.\n'));
      }

      const aliasResponse = await prompts([
        {
          type: 'text',
          name: 'components',
          message: 'Import alias for components',
          initial: `${prefix}components/ui`
        },
        {
          type: 'text',
          name: 'lib',
          message: 'Import alias for utilities',
          initial: `${prefix}lib`
        },
        {
          type: 'text',
          name: 'icons',
          message: 'Import alias for icons',
          initial: `${prefix}components/icons`
        }
      ]);

      config = {
        componentsDir: response.componentsDir,
        libDir: response.libDir,
        stylesDir: response.stylesDir,
        iconsDir: response.iconsDir,
        typescript: response.typescript,
        aliases: {
          components: aliasResponse.components,
          lib: aliasResponse.lib,
          icons: aliasResponse.icons
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
