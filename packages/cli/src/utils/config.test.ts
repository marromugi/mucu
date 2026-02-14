import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import * as fs from 'fs/promises';
import { getConfig, writeConfig, getDefaultConfig } from './config.js';

vi.mock('fs/promises');

describe('config', () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  describe('getDefaultConfig', () => {
    it('should return default configuration', () => {
      const config = getDefaultConfig();

      expect(config).toEqual({
        componentsDir: 'src/components/ui',
        libDir: 'src/lib',
        stylesDir: 'src/styles',
        iconsDir: 'src/components/icons',
        typescript: true,
        aliases: {
          components: '@/components/ui',
          lib: '@/lib',
          icons: '@/components/icons',
        },
      });
    });
  });

  describe('getConfig', () => {
    it('should read and parse config file', async () => {
      const mockConfig = {
        componentsDir: 'custom/components',
        libDir: 'custom/lib',
        stylesDir: 'custom/styles',
        typescript: true,
        aliases: {
          components: '~/components',
          lib: '~/lib',
        },
      };

      vi.mocked(fs.readFile).mockResolvedValue(JSON.stringify(mockConfig));

      const result = await getConfig('/project');

      expect(fs.readFile).toHaveBeenCalledWith(
        '/project/mucu.config.json',
        'utf-8'
      );
      expect(result).toEqual(mockConfig);
    });

    it('should return null when config file does not exist', async () => {
      vi.mocked(fs.readFile).mockRejectedValue(new Error('ENOENT'));

      const result = await getConfig('/project');

      expect(result).toBeNull();
    });

    it('should return null when config file is invalid JSON', async () => {
      vi.mocked(fs.readFile).mockResolvedValue('not valid json');

      const result = await getConfig('/project');

      expect(result).toBeNull();
    });
  });

  describe('writeConfig', () => {
    it('should write config file with proper formatting', async () => {
      vi.mocked(fs.writeFile).mockResolvedValue();

      const config = getDefaultConfig();
      await writeConfig('/project', config);

      expect(fs.writeFile).toHaveBeenCalledWith(
        '/project/mucu.config.json',
        JSON.stringify(config, null, 2),
        'utf-8'
      );
    });
  });
});
