import { describe, it, expect } from 'vitest';
import { resolveComponentDependencies } from './resolver.js';
import type { Registry, RegistryItem } from '../types/index.js';

function createRegistry(items: RegistryItem[]): Registry {
  return {
    name: 'test-registry',
    version: '1.0.0',
    items,
    utilities: [],
    styles: [],
  };
}

function createItem(
  name: string,
  registryDependencies: string[] = []
): RegistryItem {
  return {
    name,
    type: 'component',
    description: `${name} component`,
    dependencies: [],
    registryDependencies,
    files: [],
  };
}

describe('resolveComponentDependencies', () => {
  describe('basic resolution', () => {
    it('should resolve a single component with no dependencies', () => {
      const registry = createRegistry([createItem('button')]);

      const result = resolveComponentDependencies(['button'], registry);

      expect(result).toEqual(['button']);
    });

    it('should resolve dependencies in topological order', () => {
      const registry = createRegistry([
        createItem('dialog', ['button', 'overlay']),
        createItem('button'),
        createItem('overlay'),
      ]);

      const result = resolveComponentDependencies(['dialog'], registry);

      expect(result.indexOf('button')).toBeLessThan(result.indexOf('dialog'));
      expect(result.indexOf('overlay')).toBeLessThan(result.indexOf('dialog'));
      expect(result).toContain('button');
      expect(result).toContain('overlay');
      expect(result).toContain('dialog');
    });

    it('should handle multiple requested components', () => {
      const registry = createRegistry([
        createItem('button'),
        createItem('input'),
      ]);

      const result = resolveComponentDependencies(['button', 'input'], registry);

      expect(result).toContain('button');
      expect(result).toContain('input');
      expect(result).toHaveLength(2);
    });

    it('should not duplicate shared dependencies', () => {
      const registry = createRegistry([
        createItem('dialog', ['button']),
        createItem('card', ['button']),
        createItem('button'),
      ]);

      const result = resolveComponentDependencies(['dialog', 'card'], registry);

      const buttonCount = result.filter((name) => name === 'button').length;
      expect(buttonCount).toBe(1);
    });

    it('should handle deep dependency chains', () => {
      const registry = createRegistry([
        createItem('a', ['b']),
        createItem('b', ['c']),
        createItem('c', ['d']),
        createItem('d'),
      ]);

      const result = resolveComponentDependencies(['a'], registry);

      expect(result).toEqual(['d', 'c', 'b', 'a']);
    });
  });

  describe('cycle detection', () => {
    it('should throw error for direct circular dependency', () => {
      const registry = createRegistry([
        createItem('a', ['b']),
        createItem('b', ['a']),
      ]);

      expect(() => resolveComponentDependencies(['a'], registry)).toThrow(
        'Circular dependency detected'
      );
    });

    it('should throw error for indirect circular dependency', () => {
      const registry = createRegistry([
        createItem('a', ['b']),
        createItem('b', ['c']),
        createItem('c', ['a']),
      ]);

      expect(() => resolveComponentDependencies(['a'], registry)).toThrow(
        'Circular dependency detected'
      );
    });
  });

  describe('error handling', () => {
    it('should throw error for non-existent component', () => {
      const registry = createRegistry([]);

      expect(() =>
        resolveComponentDependencies(['nonexistent'], registry)
      ).toThrow('Component "nonexistent" not found in registry');
    });

    it('should throw error for non-existent dependency', () => {
      const registry = createRegistry([createItem('button', ['missing'])]);

      expect(() => resolveComponentDependencies(['button'], registry)).toThrow(
        'Component "missing" not found in registry'
      );
    });
  });
});
