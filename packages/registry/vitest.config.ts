import { defineConfig } from 'vitest/config'
import { resolve } from 'path'
import { fileURLToPath } from 'node:url'
import path from 'node:path'

const dirname = path.dirname(fileURLToPath(import.meta.url))

export default defineConfig({
  test: {
    name: 'registry',
    root: dirname,
    environment: 'jsdom',
    include: ['**/*.test.{ts,tsx}'],
    exclude: ['node_modules', '.storybook'],
    globals: true,
    setupFiles: ['./vitest.setup.ts'],
  },
  resolve: {
    alias: {
      '@': resolve(dirname, './'),
    },
  },
})
