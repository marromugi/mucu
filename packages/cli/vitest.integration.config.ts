import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    name: 'cli-integration',
    environment: 'node',
    include: ['src/**/*.integration.test.ts'],
    globals: true,
    testTimeout: 30_000,
  },
});
