import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  base: './', // Use relative paths for assets
  plugins: [
      react(),
      tailwindcss()
  ],
  build: {
    outDir: 'dist', // Optional, defines the output directory
  },
});