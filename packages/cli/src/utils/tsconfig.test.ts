import { describe, it, expect, vi, beforeEach } from 'vitest';
import * as fs from 'fs/promises';
import { detectAliasPrefix } from './tsconfig.js';

vi.mock('fs/promises');

describe('tsconfig', () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  describe('detectAliasPrefix', () => {
    it('should detect @/ prefix from tsconfig.json', async () => {
      vi.mocked(fs.readFile).mockResolvedValue(JSON.stringify({
        compilerOptions: {
          paths: { '@/*': ['./src/*'] }
        }
      }));

      const result = await detectAliasPrefix('/project');

      expect(result).toBe('@/');
    });

    it('should detect ~/ prefix', async () => {
      vi.mocked(fs.readFile).mockResolvedValue(JSON.stringify({
        compilerOptions: {
          paths: { '~/*': ['./src/*'] }
        }
      }));

      const result = await detectAliasPrefix('/project');

      expect(result).toBe('~/');
    });

    it('should detect #/ prefix', async () => {
      vi.mocked(fs.readFile).mockResolvedValue(JSON.stringify({
        compilerOptions: {
          paths: { '#/*': ['./src/*'] }
        }
      }));

      const result = await detectAliasPrefix('/project');

      expect(result).toBe('#/');
    });

    it('should return null when no tsconfig exists', async () => {
      vi.mocked(fs.readFile).mockRejectedValue(new Error('ENOENT'));

      const result = await detectAliasPrefix('/project');

      expect(result).toBeNull();
    });

    it('should return null when no paths are configured', async () => {
      vi.mocked(fs.readFile).mockResolvedValue(JSON.stringify({
        compilerOptions: { strict: true }
      }));

      const result = await detectAliasPrefix('/project');

      expect(result).toBeNull();
    });

    it('should fall back to tsconfig.app.json', async () => {
      vi.mocked(fs.readFile)
        .mockRejectedValueOnce(new Error('ENOENT'))
        .mockResolvedValueOnce(JSON.stringify({
          compilerOptions: { paths: { '~/*': ['./src/*'] } }
        }));

      const result = await detectAliasPrefix('/project');

      expect(result).toBe('~/');
    });

    it('should fall back to jsconfig.json', async () => {
      vi.mocked(fs.readFile)
        .mockRejectedValueOnce(new Error('ENOENT'))
        .mockRejectedValueOnce(new Error('ENOENT'))
        .mockResolvedValueOnce(JSON.stringify({
          compilerOptions: { paths: { '#/*': ['./*'] } }
        }));

      const result = await detectAliasPrefix('/project');

      expect(result).toBe('#/');
    });

    it('should handle tsconfig with comments (JSONC)', async () => {
      vi.mocked(fs.readFile).mockResolvedValue(`{
        // This is a comment
        "compilerOptions": {
          /* Another comment */
          "paths": { "@/*": ["./src/*"] }
        }
      }`);

      const result = await detectAliasPrefix('/project');

      expect(result).toBe('@/');
    });

    it('should ignore paths without wildcard pattern', async () => {
      vi.mocked(fs.readFile).mockResolvedValue(JSON.stringify({
        compilerOptions: {
          paths: { 'components': ['./src/components'] }
        }
      }));

      const result = await detectAliasPrefix('/project');

      expect(result).toBeNull();
    });
  });
});
