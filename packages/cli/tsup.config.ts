import { defineConfig } from 'tsup';
import pkg from './package.json';

export default defineConfig({
  entry: ['src/index.ts'],
  format: ['esm'],
  target: 'node20',
  outDir: 'dist',
  clean: true,
  sourcemap: true,
  shims: true,
  banner: {
    js: '#!/usr/bin/env node',
  },
  define: {
    'process.env.PACKAGE_VERSION': JSON.stringify(pkg.version),
  },
  onSuccess: 'tsx scripts/copy-registry.ts',
});
