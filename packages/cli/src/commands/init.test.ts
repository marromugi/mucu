import { describe, it, expect, vi, beforeEach, afterEach, type MockInstance } from 'vitest';
import type { MucuConfig } from '../types/index.js';

vi.mock('prompts', () => ({ default: vi.fn() }));
vi.mock('../utils/config.js');
vi.mock('../utils/registry.js');

import prompts from 'prompts';
import { getDefaultConfig, writeConfig } from '../utils/config.js';
import { copyUtilities, copyStyles } from '../utils/registry.js';
import { init } from './init.js';

const mockDefaultConfig: MucuConfig = {
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
};

describe('init command', () => {
  let consoleSpy: MockInstance;

  beforeEach(() => {
    vi.resetAllMocks();
    consoleSpy = vi.spyOn(console, 'log').mockImplementation(() => {});
    // Reset Commander state between tests
    init.setOptionValue('yes', undefined);
    init.setOptionValue('cwd', process.cwd());
  });

  afterEach(() => {
    consoleSpy.mockRestore();
  });

  async function runInit(...args: string[]) {
    return init.parseAsync(['node', 'mucu-init', ...args]);
  }

  it('should use default config with --yes flag', async () => {
    vi.mocked(getDefaultConfig).mockReturnValue(mockDefaultConfig);
    vi.mocked(writeConfig).mockResolvedValue();
    vi.mocked(copyUtilities).mockResolvedValue();
    vi.mocked(copyStyles).mockResolvedValue();

    await runInit('--yes');

    expect(getDefaultConfig).toHaveBeenCalled();
    expect(writeConfig).toHaveBeenCalledWith(process.cwd(), mockDefaultConfig);
    expect(copyUtilities).toHaveBeenCalledWith(process.cwd(), mockDefaultConfig);
    expect(copyStyles).toHaveBeenCalledWith(process.cwd(), mockDefaultConfig);
  });

  it('should prompt for configuration when --yes is not set', async () => {
    vi.mocked(prompts).mockResolvedValueOnce({
      componentsDir: 'custom/components',
      libDir: 'custom/lib',
      stylesDir: 'custom/styles',
      iconsDir: 'custom/icons',
      typescript: false,
    });
    vi.mocked(writeConfig).mockResolvedValue();
    vi.mocked(copyUtilities).mockResolvedValue();
    vi.mocked(copyStyles).mockResolvedValue();

    await runInit();

    expect(prompts).toHaveBeenCalledWith(
      expect.arrayContaining([
        expect.objectContaining({ name: 'componentsDir' }),
        expect.objectContaining({ name: 'libDir' }),
        expect.objectContaining({ name: 'stylesDir' }),
        expect.objectContaining({ name: 'iconsDir' }),
        expect.objectContaining({ name: 'typescript' }),
      ])
    );
    expect(writeConfig).toHaveBeenCalledWith(process.cwd(), {
      componentsDir: 'custom/components',
      libDir: 'custom/lib',
      stylesDir: 'custom/styles',
      iconsDir: 'custom/icons',
      typescript: false,
      aliases: {
        components: '@/components/ui',
        lib: '@/lib',
        icons: '@/components/icons',
      },
    });
  });

  it('should write config, copy utilities, and copy styles', async () => {
    vi.mocked(getDefaultConfig).mockReturnValue(mockDefaultConfig);
    vi.mocked(writeConfig).mockResolvedValue();
    vi.mocked(copyUtilities).mockResolvedValue();
    vi.mocked(copyStyles).mockResolvedValue();

    await runInit('--yes');

    expect(writeConfig).toHaveBeenCalledTimes(1);
    expect(copyUtilities).toHaveBeenCalledTimes(1);
    expect(copyStyles).toHaveBeenCalledTimes(1);
  });

  it('should log success messages', async () => {
    vi.mocked(getDefaultConfig).mockReturnValue(mockDefaultConfig);
    vi.mocked(writeConfig).mockResolvedValue();
    vi.mocked(copyUtilities).mockResolvedValue();
    vi.mocked(copyStyles).mockResolvedValue();

    await runInit('--yes');

    expect(consoleSpy).toHaveBeenCalledWith(
      expect.stringContaining('Initializing mucu')
    );
    expect(consoleSpy).toHaveBeenCalledWith(
      expect.stringContaining('Created mucu.config.json')
    );
    expect(consoleSpy).toHaveBeenCalledWith(
      expect.stringContaining('Copied utilities')
    );
    expect(consoleSpy).toHaveBeenCalledWith(
      expect.stringContaining('Copied styles')
    );
    expect(consoleSpy).toHaveBeenCalledWith(
      expect.stringContaining('mucu initialized successfully')
    );
  });

  it('should use custom cwd when provided', async () => {
    vi.mocked(getDefaultConfig).mockReturnValue(mockDefaultConfig);
    vi.mocked(writeConfig).mockResolvedValue();
    vi.mocked(copyUtilities).mockResolvedValue();
    vi.mocked(copyStyles).mockResolvedValue();

    await runInit('--yes', '--cwd', '/custom/path');

    expect(writeConfig).toHaveBeenCalledWith('/custom/path', mockDefaultConfig);
    expect(copyUtilities).toHaveBeenCalledWith(
      '/custom/path',
      mockDefaultConfig
    );
    expect(copyStyles).toHaveBeenCalledWith('/custom/path', mockDefaultConfig);
  });

  it('should construct config with correct aliases from prompts', async () => {
    vi.mocked(prompts).mockResolvedValueOnce({
      componentsDir: 'app/ui',
      libDir: 'app/utils',
      stylesDir: 'app/css',
      iconsDir: 'app/icons',
      typescript: true,
    });
    vi.mocked(writeConfig).mockResolvedValue();
    vi.mocked(copyUtilities).mockResolvedValue();
    vi.mocked(copyStyles).mockResolvedValue();

    await runInit();

    expect(writeConfig).toHaveBeenCalledWith(
      process.cwd(),
      expect.objectContaining({
        aliases: {
          components: '@/components/ui',
          lib: '@/lib',
          icons: '@/components/icons',
        },
      })
    );
  });
});
