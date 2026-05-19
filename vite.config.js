import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path';
import { fileURLToPath } from 'url';
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const reactBuild = '/Users/maxcohen/code/react/build/node_modules';
// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    dedupe: ['react', 'react-dom'],
    alias: {
      react: path.join(reactBuild, 'react'),
      'react-dom': path.join(reactBuild, 'react-dom'),
      scheduler: path.join(reactBuild, 'scheduler'),
    },
  },
  server: {
    fs: {
      allow: [reactBuild, path.resolve(__dirname, '..')],
    },
  },
  // Local React build is CJS-only — must pre-bundle for the browser (do not exclude).
  optimizeDeps: {
    include: [
      'react',
      'react/jsx-dev-runtime',
      'react-dom',
      'react-dom/client',
      'scheduler',
    ],
  },
})