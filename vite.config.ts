import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const rootDir = dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  plugins: [react()],
  base: './',
  build: {
    rollupOptions: {
      input: {
        index: resolve(rootDir, 'index.html'),
        algorithms: resolve(rootDir, 'algorithms.html'),
        benchmarks: resolve(rootDir, 'benchmarks.html'),
        contact: resolve(rootDir, 'contact.html'),
        license: resolve(rootDir, 'license.html'),
      },
    },
  },
});
