import * as fs from 'fs/promises';
import * as path from 'path';
import { fileURLToPath } from 'url';
import type { Registry } from '../src/types/index.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const REGISTRY_SOURCE = path.resolve(__dirname, '../../registry');
const DIST_REGISTRY = path.resolve(__dirname, '../dist/registry');

async function copyRegistry(): Promise<void> {
  const registryJsonPath = path.join(REGISTRY_SOURCE, 'registry.json');
  const registryContent = await fs.readFile(registryJsonPath, 'utf-8');
  const registry: Registry = JSON.parse(registryContent);

  const filePaths = new Set<string>();
  for (const section of [registry.items, registry.utilities, registry.styles]) {
    for (const entry of section) {
      for (const file of entry.files) {
        filePaths.add(file.path);
      }
    }
  }

  await fs.mkdir(DIST_REGISTRY, { recursive: true });
  await fs.writeFile(
    path.join(DIST_REGISTRY, 'registry.json'),
    registryContent,
    'utf-8'
  );

  let copiedCount = 0;
  const errors: string[] = [];

  for (const filePath of filePaths) {
    const srcFile = path.join(REGISTRY_SOURCE, filePath);
    const destFile = path.join(DIST_REGISTRY, filePath);

    try {
      await fs.mkdir(path.dirname(destFile), { recursive: true });
      await fs.copyFile(srcFile, destFile);
      copiedCount++;
    } catch (err) {
      const message = err instanceof Error ? err.message : String(err);
      errors.push(`Failed to copy ${filePath}: ${message}`);
    }
  }

  console.log(
    `Copied registry.json + ${copiedCount} source files to dist/registry/`
  );

  if (errors.length > 0) {
    console.error('Errors during registry copy:');
    for (const error of errors) {
      console.error(`  - ${error}`);
    }
    process.exit(1);
  }
}

copyRegistry().catch((err) => {
  console.error('Fatal error copying registry:', err);
  process.exit(1);
});
