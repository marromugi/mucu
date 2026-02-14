import { describe, it, expect, vi, beforeEach } from 'vitest';
import { generateIcons } from './index.js';

// node:fs のモック
vi.mock('node:fs', () => ({
  promises: {
    access: vi.fn(),
    readdir: vi.fn(),
    readFile: vi.fn(),
    mkdir: vi.fn(),
    writeFile: vi.fn(),
  },
}));

// svgo のモック（実際のSVGO処理を軽量化）
vi.mock('svgo', () => ({
  optimize: vi.fn((svg) => ({ data: svg })),
}));

import { promises as fs } from 'node:fs';

const validSvg =
  '<svg width="24" height="24" viewBox="0 0 24 24"><path d="M12 4"/></svg>';

describe('generateIcons', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('success cases', () => {
    it('should generate icons from mono directory', async () => {
      vi.mocked(fs.access).mockResolvedValue(undefined);
      vi.mocked(fs.readdir).mockImplementation(async (dirPath) => {
        const path = String(dirPath);
        if (path.endsWith('/mono')) return ['arrow.svg'];
        if (path.endsWith('/fullcolor')) return [];
        return [];
      });
      vi.mocked(fs.readFile).mockResolvedValue(validSvg);
      vi.mocked(fs.mkdir).mockResolvedValue(undefined);
      vi.mocked(fs.writeFile).mockResolvedValue(undefined);

      const result = await generateIcons({
        input: '/input',
        output: '/output',
      });

      expect(result.success).toBe(true);
      expect(result.count).toBe(1);
      expect(result.errors).toHaveLength(0);
    });

    it('should generate icons from fullcolor directory', async () => {
      vi.mocked(fs.access).mockResolvedValue(undefined);
      vi.mocked(fs.readdir).mockImplementation(async (dirPath) => {
        const path = String(dirPath);
        if (path.endsWith('/mono')) return [];
        if (path.endsWith('/fullcolor')) return ['logo.svg'];
        return [];
      });
      vi.mocked(fs.readFile).mockResolvedValue(validSvg);
      vi.mocked(fs.mkdir).mockResolvedValue(undefined);
      vi.mocked(fs.writeFile).mockResolvedValue(undefined);

      const result = await generateIcons({
        input: '/input',
        output: '/output',
      });

      expect(result.success).toBe(true);
      expect(result.count).toBe(1);
    });

    it('should generate icons from flat directory when no subdirs exist', async () => {
      vi.mocked(fs.access).mockImplementation(async (path) => {
        const pathStr = String(path);
        if (pathStr.endsWith('/mono') || pathStr.endsWith('/fullcolor')) {
          throw new Error('Not found');
        }
        return undefined;
      });
      vi.mocked(fs.readdir).mockImplementation(async (dirPath) => {
        const path = String(dirPath);
        if (path.endsWith('/mono') || path.endsWith('/fullcolor')) {
          return [];
        }
        return ['icon.svg'];
      });
      vi.mocked(fs.readFile).mockResolvedValue(validSvg);
      vi.mocked(fs.mkdir).mockResolvedValue(undefined);
      vi.mocked(fs.writeFile).mockResolvedValue(undefined);

      const result = await generateIcons({
        input: '/input',
        output: '/output',
      });

      expect(result.success).toBe(true);
      expect(result.count).toBe(1);
    });

    it('should generate index.ts file', async () => {
      vi.mocked(fs.access).mockResolvedValue(undefined);
      vi.mocked(fs.readdir).mockImplementation(async (dirPath) => {
        if (String(dirPath).endsWith('/mono')) {
          return ['arrow.svg', 'close.svg'];
        }
        return [];
      });
      vi.mocked(fs.readFile).mockResolvedValue(validSvg);
      vi.mocked(fs.mkdir).mockResolvedValue(undefined);
      vi.mocked(fs.writeFile).mockResolvedValue(undefined);

      await generateIcons({
        input: '/input',
        output: '/output',
      });

      expect(fs.writeFile).toHaveBeenCalledWith(
        '/output/index.ts',
        expect.stringContaining('export')
      );
    });

    it('should create output directory', async () => {
      vi.mocked(fs.access).mockResolvedValue(undefined);
      vi.mocked(fs.readdir).mockImplementation(async (dirPath) => {
        if (String(dirPath).endsWith('/mono')) return ['icon.svg'];
        return [];
      });
      vi.mocked(fs.readFile).mockResolvedValue(validSvg);
      vi.mocked(fs.mkdir).mockResolvedValue(undefined);
      vi.mocked(fs.writeFile).mockResolvedValue(undefined);

      await generateIcons({
        input: '/input',
        output: '/output/nested/path',
      });

      expect(fs.mkdir).toHaveBeenCalledWith('/output/nested/path', { recursive: true });
    });
  });

  describe('error cases', () => {
    it('should return error when no SVG files found', async () => {
      vi.mocked(fs.access).mockRejectedValue(new Error('Not found'));
      vi.mocked(fs.readdir).mockResolvedValue([]);

      const result = await generateIcons({
        input: '/empty',
        output: '/output',
      });

      expect(result.success).toBe(false);
      expect(result.count).toBe(0);
      expect(result.errors).toContain('No SVG files found in /empty');
    });

    it('should detect duplicate component names across directories', async () => {
      vi.mocked(fs.access).mockResolvedValue(undefined);
      vi.mocked(fs.readdir).mockImplementation(async (dirPath) => {
        const path = String(dirPath);
        if (path.endsWith('/mono')) return ['icon.svg'];
        if (path.endsWith('/fullcolor')) return ['icon.svg'];
        return [];
      });
      vi.mocked(fs.readFile).mockResolvedValue(validSvg);
      vi.mocked(fs.mkdir).mockResolvedValue(undefined);
      vi.mocked(fs.writeFile).mockResolvedValue(undefined);

      const result = await generateIcons({
        input: '/input',
        output: '/output',
      });

      expect(result.success).toBe(false);
      expect(result.errors[0]).toContain('Duplicate name');
      expect(result.errors[0]).toContain('Icon');
    });

    it('should handle invalid SVG content', async () => {
      vi.mocked(fs.access).mockResolvedValue(undefined);
      vi.mocked(fs.readdir).mockImplementation(async (dirPath) => {
        if (String(dirPath).endsWith('/mono')) return ['bad.svg'];
        return [];
      });
      vi.mocked(fs.readFile).mockResolvedValue('not valid svg content');
      vi.mocked(fs.mkdir).mockResolvedValue(undefined);
      vi.mocked(fs.writeFile).mockResolvedValue(undefined);

      const result = await generateIcons({
        input: '/input',
        output: '/output',
      });

      expect(result.errors.length).toBeGreaterThan(0);
      expect(result.errors[0]).toContain('Invalid SVG');
    });
  });

  describe('options', () => {
    it('should use custom mono directory name', async () => {
      vi.mocked(fs.access).mockResolvedValue(undefined);
      vi.mocked(fs.readdir).mockImplementation(async (dirPath) => {
        if (String(dirPath).endsWith('/custom-mono')) {
          return ['icon.svg'];
        }
        return [];
      });
      vi.mocked(fs.readFile).mockResolvedValue(validSvg);
      vi.mocked(fs.mkdir).mockResolvedValue(undefined);
      vi.mocked(fs.writeFile).mockResolvedValue(undefined);

      const result = await generateIcons({
        input: '/input',
        output: '/output',
        monoDir: 'custom-mono',
      });

      expect(result.success).toBe(true);
      expect(result.count).toBe(1);
    });

    it('should use custom fullcolor directory name', async () => {
      vi.mocked(fs.access).mockResolvedValue(undefined);
      vi.mocked(fs.readdir).mockImplementation(async (dirPath) => {
        if (String(dirPath).endsWith('/colored')) {
          return ['logo.svg'];
        }
        return [];
      });
      vi.mocked(fs.readFile).mockResolvedValue(validSvg);
      vi.mocked(fs.mkdir).mockResolvedValue(undefined);
      vi.mocked(fs.writeFile).mockResolvedValue(undefined);

      const result = await generateIcons({
        input: '/input',
        output: '/output',
        fullcolorDir: 'colored',
      });

      expect(result.success).toBe(true);
      expect(result.count).toBe(1);
    });
  });
});
