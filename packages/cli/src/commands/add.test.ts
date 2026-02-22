import { describe, it, expect, vi, beforeEach, afterEach, type MockInstance } from 'vitest';
import type { Registry, MucuConfig } from '../types/index.js';

vi.mock('prompts', () => ({ default: vi.fn() }));
vi.mock('../utils/config.js');
vi.mock('../utils/registry.js');
vi.mock('../utils/resolver.js');

import prompts from 'prompts';
import { getConfig } from '../utils/config.js';
import { fetchRegistry, copyComponentToProject } from '../utils/registry.js';
import { resolveComponentDependencies } from '../utils/resolver.js';
import { add } from './add.js';

const mockConfig: MucuConfig = {
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

const mockRegistry: Registry = {
  name: 'mucu',
  version: '0.1.0',
  items: [
    {
      name: 'Button',
      type: 'component',
      description: 'A button component',
      dependencies: [],
      registryDependencies: [],
      files: [{ path: 'Button/Button.tsx', type: 'component' }],
    },
    {
      name: 'TextField',
      type: 'component',
      description: 'A text field component',
      dependencies: [],
      registryDependencies: [],
      files: [{ path: 'TextField/TextField.tsx', type: 'component' }],
    },
  ],
  utilities: [],
  styles: [],
};

describe('add command', () => {
  let exitSpy: MockInstance;
  let consoleSpy: MockInstance;

  beforeEach(() => {
    vi.resetAllMocks();
    exitSpy = vi.spyOn(process, 'exit').mockImplementation((() => {
      throw new Error('process.exit');
    }) as never);
    consoleSpy = vi.spyOn(console, 'log').mockImplementation(() => {});
    // Reset Commander state between tests
    add.setOptionValue('yes', undefined);
    add.setOptionValue('overwrite', undefined);
    add.setOptionValue('all', undefined);
    add.setOptionValue('cwd', process.cwd());
  });

  afterEach(() => {
    exitSpy.mockRestore();
    consoleSpy.mockRestore();
  });

  async function runAdd(...args: string[]) {
    return add.parseAsync(['node', 'mucu-add', ...args]);
  }

  it('should exit with error when no config is found', async () => {
    vi.mocked(getConfig).mockResolvedValue(null);

    await expect(runAdd('Button')).rejects.toThrow('process.exit');

    expect(exitSpy).toHaveBeenCalledWith(1);
    expect(consoleSpy).toHaveBeenCalledWith(
      expect.stringContaining('No mucu.config.json found')
    );
  });

  it('should add specified components with --yes flag', async () => {
    vi.mocked(getConfig).mockResolvedValue(mockConfig);
    vi.mocked(fetchRegistry).mockResolvedValue(mockRegistry);
    vi.mocked(resolveComponentDependencies).mockReturnValue(['Button']);
    vi.mocked(copyComponentToProject).mockResolvedValue();

    await runAdd('Button', '--yes');

    expect(resolveComponentDependencies).toHaveBeenCalledWith(
      ['Button'],
      mockRegistry
    );
    expect(copyComponentToProject).toHaveBeenCalledWith('Button', mockConfig, {
      overwrite: undefined,
      cwd: process.cwd(),
    });
  });

  it('should add all components with --all --yes flags', async () => {
    vi.mocked(getConfig).mockResolvedValue(mockConfig);
    vi.mocked(fetchRegistry).mockResolvedValue(mockRegistry);
    vi.mocked(resolveComponentDependencies).mockReturnValue([
      'Button',
      'TextField',
    ]);
    vi.mocked(copyComponentToProject).mockResolvedValue();

    await runAdd('--all', '--yes');

    expect(resolveComponentDependencies).toHaveBeenCalledWith(
      ['Button', 'TextField'],
      mockRegistry
    );
    expect(copyComponentToProject).toHaveBeenCalledTimes(2);
  });

  it('should prompt for component selection when none specified', async () => {
    vi.mocked(getConfig).mockResolvedValue(mockConfig);
    vi.mocked(fetchRegistry).mockResolvedValue(mockRegistry);
    vi.mocked(prompts)
      .mockResolvedValueOnce({ components: ['Button'] })
      .mockResolvedValueOnce({ confirm: true });
    vi.mocked(resolveComponentDependencies).mockReturnValue(['Button']);
    vi.mocked(copyComponentToProject).mockResolvedValue();

    await runAdd();

    expect(prompts).toHaveBeenCalledWith(
      expect.objectContaining({
        type: 'multiselect',
        name: 'components',
      })
    );
    expect(copyComponentToProject).toHaveBeenCalledTimes(1);
  });

  it('should warn and return when no components are selected', async () => {
    vi.mocked(getConfig).mockResolvedValue(mockConfig);
    vi.mocked(fetchRegistry).mockResolvedValue(mockRegistry);
    vi.mocked(prompts).mockResolvedValueOnce({ components: [] });

    await runAdd();

    expect(consoleSpy).toHaveBeenCalledWith(
      expect.stringContaining('No components selected')
    );
    expect(copyComponentToProject).not.toHaveBeenCalled();
  });

  it('should prompt for confirmation when --yes is not set', async () => {
    vi.mocked(getConfig).mockResolvedValue(mockConfig);
    vi.mocked(fetchRegistry).mockResolvedValue(mockRegistry);
    vi.mocked(resolveComponentDependencies).mockReturnValue(['Button']);
    vi.mocked(prompts).mockResolvedValueOnce({ confirm: true });
    vi.mocked(copyComponentToProject).mockResolvedValue();

    await runAdd('Button');

    expect(prompts).toHaveBeenCalledWith(
      expect.objectContaining({
        type: 'confirm',
        name: 'confirm',
      })
    );
    expect(copyComponentToProject).toHaveBeenCalledTimes(1);
  });

  it('should exit when confirmation is declined', async () => {
    vi.mocked(getConfig).mockResolvedValue(mockConfig);
    vi.mocked(fetchRegistry).mockResolvedValue(mockRegistry);
    vi.mocked(resolveComponentDependencies).mockReturnValue(['Button']);
    vi.mocked(prompts).mockResolvedValueOnce({ confirm: false });

    await expect(runAdd('Button')).rejects.toThrow('process.exit');

    expect(exitSpy).toHaveBeenCalledWith(0);
    expect(copyComponentToProject).not.toHaveBeenCalled();
  });

  it('should pass overwrite option to copyComponentToProject', async () => {
    vi.mocked(getConfig).mockResolvedValue(mockConfig);
    vi.mocked(fetchRegistry).mockResolvedValue(mockRegistry);
    vi.mocked(resolveComponentDependencies).mockReturnValue(['Button']);
    vi.mocked(copyComponentToProject).mockResolvedValue();

    await runAdd('Button', '--yes', '--overwrite');

    expect(copyComponentToProject).toHaveBeenCalledWith('Button', mockConfig, {
      overwrite: true,
      cwd: process.cwd(),
    });
  });

  it('should pass custom cwd option', async () => {
    vi.mocked(getConfig).mockResolvedValue(mockConfig);
    vi.mocked(fetchRegistry).mockResolvedValue(mockRegistry);
    vi.mocked(resolveComponentDependencies).mockReturnValue(['Button']);
    vi.mocked(copyComponentToProject).mockResolvedValue();

    await runAdd('Button', '--yes', '--cwd', '/custom/path');

    expect(getConfig).toHaveBeenCalledWith('/custom/path');
    expect(copyComponentToProject).toHaveBeenCalledWith('Button', mockConfig, {
      overwrite: undefined,
      cwd: '/custom/path',
    });
  });
});
