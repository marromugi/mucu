import { execSync } from 'child_process';
import * as fs from 'fs/promises';
import * as path from 'path';
import { fileURLToPath } from 'url';
import os from 'os';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const CLI_PATH = path.resolve(__dirname, '../../dist/index.js');

describe('CLI integration', () => {
  let tempDir: string;

  beforeEach(async () => {
    tempDir = await fs.mkdtemp(path.join(os.tmpdir(), 'mucu-test-'));
  });

  afterEach(async () => {
    await fs.rm(tempDir, { recursive: true, force: true });
  });

  function run(args: string): string {
    return execSync(`node ${CLI_PATH} ${args}`, {
      cwd: tempDir,
      encoding: 'utf-8',
      timeout: 10_000,
    });
  }

  it('should list components from the bundled registry', () => {
    const output = run('list');
    expect(output).toContain('button');
  });

  it('should initialize a project with --yes', async () => {
    run('init --yes');

    const configPath = path.join(tempDir, 'mucu.config.json');
    const content = await fs.readFile(configPath, 'utf-8');
    const config = JSON.parse(content);

    expect(config.componentsDir).toBeDefined();
    expect(config.libDir).toBeDefined();
  });

  it('should copy utilities and styles during init', async () => {
    run('init --yes');

    const libDir = path.join(tempDir, 'src', 'lib');
    const stylesDir = path.join(tempDir, 'src', 'styles');

    const libFiles = await fs.readdir(libDir);
    const styleFiles = await fs.readdir(stylesDir);

    expect(libFiles.length).toBeGreaterThan(0);
    expect(styleFiles.length).toBeGreaterThan(0);
  });

  it('should add a component to the project', async () => {
    run('init --yes');
    run('add button --yes');

    const componentDir = path.join(tempDir, 'src', 'components', 'ui', 'Button');
    const files = await fs.readdir(componentDir);

    expect(files.length).toBeGreaterThan(0);
    expect(files.some((f) => f.endsWith('.tsx'))).toBe(true);
  });
});
