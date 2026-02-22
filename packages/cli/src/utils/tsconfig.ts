import * as fs from 'fs/promises';
import * as path from 'path';

const TSCONFIG_FILES = [
  'tsconfig.json',
  'tsconfig.app.json',
  'jsconfig.json',
];

async function readTsconfig(filePath: string): Promise<Record<string, unknown> | null> {
  try {
    let content = await fs.readFile(filePath, 'utf-8');
    content = content.replace(/\/\/.*$/gm, '');
    content = content.replace(/\/\*[\s\S]*?\*\//g, '');
    return JSON.parse(content);
  } catch {
    return null;
  }
}

function extractPrefix(paths: Record<string, string[]>): string | null {
  for (const key of Object.keys(paths)) {
    const match = key.match(/^([^*]+)\*$/);
    if (match) {
      return match[1];
    }
  }
  return null;
}

export async function detectAliasPrefix(cwd: string): Promise<string | null> {
  for (const filename of TSCONFIG_FILES) {
    const filePath = path.join(cwd, filename);
    const config = await readTsconfig(filePath);

    if (!config) continue;

    const compilerOptions = config.compilerOptions as Record<string, unknown> | undefined;
    if (!compilerOptions?.paths) continue;

    const paths = compilerOptions.paths as Record<string, string[]>;
    const prefix = extractPrefix(paths);

    if (prefix) {
      return prefix;
    }
  }

  return null;
}
