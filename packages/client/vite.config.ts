import {defineConfig} from 'vite';
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';
// https://vitejs.dev/config/
export default defineConfig({
  root: './src',
  // root (= ./src) から見た相対パスで指定
  publicDir: '../public',
  plugins: [react(), tsconfigPaths()],
  build: {
    outDir: '../dist',
    emptyOutDir: true,
  },
});
