import type { Registry, RegistryItem } from '../types/index.js';

/**
 * Resolves component dependencies using topological sort.
 */
export function resolveComponentDependencies(
  componentNames: string[],
  registry: Registry
): string[] {
  const resolved: string[] = [];
  const visited = new Set<string>();
  const visiting = new Set<string>();

  const itemMap = new Map<string, RegistryItem>();
  for (const item of registry.items) {
    itemMap.set(item.name, item);
  }

  function visit(name: string): void {
    if (visited.has(name)) return;
    if (visiting.has(name)) {
      throw new Error(`Circular dependency detected: ${name}`);
    }

    const item = itemMap.get(name);
    if (!item) {
      throw new Error(`Component "${name}" not found in registry`);
    }

    visiting.add(name);

    for (const dep of item.registryDependencies) {
      visit(dep);
    }

    visiting.delete(name);
    visited.add(name);
    resolved.push(name);
  }

  for (const name of componentNames) {
    visit(name);
  }

  return resolved;
}
