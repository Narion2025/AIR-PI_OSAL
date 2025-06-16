import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    coverage: {
      reporter: ['text', 'json'],
      exclude: ['src/example.ts', 'src/server.ts', 'src/index.ts', 'vitest.config.ts', 'dist']
    },
  },
});
