import {defineConfig} from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  root: './src',
  // root (= ./src) から見た相対パスで指定
  publicDir: '../public',
  plugins: [react()],
  resolve: {
    alias: {
      '@/': `${__dirname}/src/`, // path.join(__dirname, "src/") でも可
    },
  },
  build: {
    outDir: '../dist',
    emptyOutDir: true,
  },
});
