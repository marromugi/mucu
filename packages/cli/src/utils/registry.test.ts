import { describe, it, expect } from 'vitest';
import { resolveTargetPath, transformImports } from './registry.js';
import type { MucuConfig, RegistryFile } from '../types/index.js';

function createConfig(overrides: Partial<MucuConfig> = {}): MucuConfig {
  return {
    componentsDir: 'src/components/ui',
    libDir: 'src/lib',
    stylesDir: 'src/styles',
    typescript: true,
    aliases: {
      components: '@/components/ui',
      lib: '@/lib',
    },
    ...overrides,
  };
}

describe('registry', () => {
  describe('resolveTargetPath', () => {
    it('should resolve component file path', () => {
      const file: RegistryFile = {
        path: 'components/button/button.tsx',
        type: 'component',
      };
      const config = createConfig();

      const result = resolveTargetPath(file, config, '/project');

      expect(result).toBe('/project/src/components/ui/button/button.tsx');
    });

    it('should resolve lib file path', () => {
      const file: RegistryFile = {
        path: 'lib/cn.ts',
        type: 'lib',
      };
      const config = createConfig();

      const result = resolveTargetPath(file, config, '/project');

      expect(result).toBe('/project/src/lib/cn.ts');
    });

    it('should resolve style file path', () => {
      const file: RegistryFile = {
        path: 'components/button/button.module.css',
        type: 'style',
      };
      const config = createConfig();

      const result = resolveTargetPath(file, config, '/project');

      expect(result).toBe('/project/src/components/ui/button/button.module.css');
    });

    it('should use custom directories from config', () => {
      const file: RegistryFile = {
        path: 'lib/utils.ts',
        type: 'lib',
      };
      const config = createConfig({ libDir: 'custom/utilities' });

      const result = resolveTargetPath(file, config, '/project');

      expect(result).toBe('/project/custom/utilities/utils.ts');
    });
  });

  describe('transformImports', () => {
    it('should not transform @/lib/ imports when alias matches', () => {
      const content = `import { cn } from '@/lib/cn';`;
      const config = createConfig();

      const result = transformImports(content, config);

      expect(result).toBe(`import { cn } from '@/lib/cn';`);
    });

    it('should not transform @/components/ui/ imports when alias matches', () => {
      const content = `import { Button } from '@/components/ui/button';`;
      const config = createConfig();

      const result = transformImports(content, config);

      expect(result).toBe(`import { Button } from '@/components/ui/button';`);
    });

    it('should transform imports with custom aliases', () => {
      const content = `import { cn } from '@/lib/cn';
import { Button } from '@/components/ui/button';`;
      const config = createConfig({
        aliases: {
          components: '~/ui',
          lib: '~/utils',
        },
      });

      const result = transformImports(content, config);

      expect(result).toBe(`import { cn } from '~/utils/cn';
import { Button } from '~/ui/button';`);
    });

    it('should handle multiple imports on same line', () => {
      const content = `import '@/lib/a'; import '@/lib/b';`;
      const config = createConfig({
        aliases: { components: '@/components/ui', lib: '~/lib' },
      });

      const result = transformImports(content, config);

      expect(result).toBe(`import '~/lib/a'; import '~/lib/b';`);
    });

    it('should preserve non-matching imports', () => {
      const content = `import { something } from 'other-package';`;
      const config = createConfig();

      const result = transformImports(content, config);

      expect(result).toBe(`import { something } from 'other-package';`);
    });
  });
});
