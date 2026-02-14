import * as fs from 'fs/promises';
import * as path from 'path';
import type { MucuConfig } from '../types/index.js';

const CONFIG_FILE = 'mucu.config.json';

export function getDefaultConfig(): MucuConfig {
  return {
    componentsDir: 'src/components/ui',
    libDir: 'src/lib',
    stylesDir: 'src/styles',
    iconsDir: 'src/components/icons',
    typescript: true,
    aliases: {
      components: '@/components/ui',
      lib: '@/lib',
      icons: '@/components/icons'
    }
  };
}

export async function getConfig(cwd: string): Promise<MucuConfig | null> {
  const configPath = path.join(cwd, CONFIG_FILE);
  try {
    const content = await fs.readFile(configPath, 'utf-8');
    return JSON.parse(content) as MucuConfig;
  } catch {
    return null;
  }
}

export async function writeConfig(cwd: string, config: MucuConfig): Promise<void> {
  const configPath = path.join(cwd, CONFIG_FILE);
  await fs.writeFile(configPath, JSON.stringify(config, null, 2), 'utf-8');
}
