import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import tailwindcss from '@tailwindcss/vite';

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    tailwindcss(),
    react(),
  ],
  resolve: {
    alias: {
      '@main': path.resolve(__dirname, 'src'), // Alias untuk folder src
      '@projects': path.resolve(__dirname, 'projects'), // Alias untuk folder projects
    },
  },
});
