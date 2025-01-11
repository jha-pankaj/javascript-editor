import { defineConfig } from '@angular-devkit/build-angular/src/vite/config';

export default defineConfig({
  worker: {
    format: 'es',
    plugins: []
  },
  optimizeDeps: {
    include: ['monaco-editor'],
  },
  build: {
    target: 'esnext',
    rollupOptions: {
      output: {
        manualChunks: {
          'monaco-editor': ['monaco-editor']
        }
      }
    }
  },
  server: {
    fs: {
      strict: true
    }
  }
});