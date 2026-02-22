import * as fs from 'fs/promises';
import * as path from 'path';
import { fileURLToPath } from 'url';
import type { Registry, MucuConfig, RegistryFile } from '../types/index.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const REGISTRY_PATH = path.join(__dirname, 'registry');

export async function fetchRegistry(): Promise<Registry> {
  const content = await fs.readFile(
    path.join(REGISTRY_PATH, 'registry.json'),
    'utf-8'
  );
  return JSON.parse(content);
}

export async function fetchFile(relativePath: string): Promise<string> {
  return fs.readFile(path.join(REGISTRY_PATH, relativePath), 'utf-8');
}

export function resolveTargetPath(
  file: RegistryFile,
  config: MucuConfig,
  cwd: string
): string {
  const filename = path.basename(file.path);
  const componentName = path.basename(path.dirname(file.path));

  switch (file.type) {
    case 'component':
    case 'style':
      return path.join(cwd, config.componentsDir, componentName, filename);
    case 'lib':
      return path.join(cwd, config.libDir, filename);
    default:
      return path.join(cwd, config.componentsDir, filename);
  }
}

export function transformImports(content: string, config: MucuConfig): string {
  return content
    .replace(/@\/lib\//g, `${config.aliases.lib}/`)
    .replace(/@\/components\/ui\//g, `${config.aliases.components}/`);
}

export async function copyComponentToProject(
  componentName: string,
  config: MucuConfig,
  options: { overwrite?: boolean; cwd: string }
): Promise<void> {
  const registry = await fetchRegistry();
  const allItems = [...registry.items, ...registry.utilities, ...registry.styles];
  const item = allItems.find(i => i.name === componentName);

  if (!item) {
    throw new Error(`Component "${componentName}" not found`);
  }

  for (const file of item.files) {
    const sourceContent = await fetchFile(file.path);
    const targetPath = resolveTargetPath(file, config, options.cwd);

    const exists = await fileExists(targetPath);
    if (exists && !options.overwrite) {
      continue;
    }

    const transformedContent = transformImports(sourceContent, config);
    await fs.mkdir(path.dirname(targetPath), { recursive: true });
    await fs.writeFile(targetPath, transformedContent, 'utf-8');
  }
}

export async function copyUtilities(
  cwd: string,
  config: MucuConfig
): Promise<void> {
  const registry = await fetchRegistry();

  for (const util of registry.utilities) {
    for (const file of util.files) {
      const sourceContent = await fetchFile(file.path);
      const targetPath = path.join(cwd, config.libDir, path.basename(file.path));

      await fs.mkdir(path.dirname(targetPath), { recursive: true });
      await fs.writeFile(targetPath, sourceContent, 'utf-8');
    }
  }
}

export async function copyStyles(
  cwd: string,
  config: MucuConfig
): Promise<void> {
  const registry = await fetchRegistry();

  for (const style of registry.styles) {
    for (const file of style.files) {
      const sourceContent = await fetchFile(file.path);
      const targetPath = path.join(cwd, config.stylesDir, path.basename(file.path));

      await fs.mkdir(path.dirname(targetPath), { recursive: true });
      await fs.writeFile(targetPath, sourceContent, 'utf-8');
    }
  }
}

async function fileExists(filePath: string): Promise<boolean> {
  try {
    await fs.access(filePath);
    return true;
  } catch {
    return false;
  }
}
