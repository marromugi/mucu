import { Command } from 'commander';
import path from 'node:path';
import pc from 'picocolors';
import { getConfig } from '../utils/config.js';
import { generateIcons } from '../utils/icon-generator/index.js';

export const icon = new Command()
  .name('icon')
  .description('Icon utilities');

icon
  .command('generate <input>')
  .description('Generate React components from SVG files')
  .option('-o, --output <dir>', 'Output directory')
  .option('--mono-dir <name>', 'Subdirectory for mono icons', 'mono')
  .option('--fullcolor-dir <name>', 'Subdirectory for fullcolor icons', 'fullcolor')
  .option('-c, --cwd <path>', 'Working directory', process.cwd())
  .action(async (input: string, options) => {
    const cwd = options.cwd;
    const inputPath = path.resolve(cwd, input);

    // 出力先を決定: --output > mucu.config.json の iconsDir > デフォルト
    let outputPath: string;
    if (options.output) {
      outputPath = path.resolve(cwd, options.output);
    } else {
      const config = await getConfig(cwd);
      outputPath = path.resolve(cwd, config?.iconsDir || 'src/components/icons');
    }

    console.log(pc.cyan('\nGenerating icons...'));
    console.log(pc.gray(`  Input:  ${inputPath}`));
    console.log(pc.gray(`  Output: ${outputPath}\n`));

    const result = await generateIcons({
      input: inputPath,
      output: outputPath,
      monoDir: options.monoDir,
      fullcolorDir: options.fullcolorDir,
    });

    if (result.errors.length > 0) {
      console.log(pc.red('\nErrors:'));
      for (const error of result.errors) {
        console.log(pc.red(`  - ${error}`));
      }
    }

    if (result.count > 0) {
      console.log(pc.green(`\nGenerated ${result.count} icon(s) successfully!`));
    } else if (result.errors.length === 0) {
      console.log(pc.yellow('\nNo icons generated.'));
    }

    if (!result.success) {
      process.exit(1);
    }
  });
