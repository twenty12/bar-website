import { defineConfig } from "vite";
import react from '@vitejs/plugin-react-swc'

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist', // Output directory
    emptyOutDir: true, // Clears the output directory before building
    rollupOptions: {
      input: './index.html', // Ensure Vite uses the correct input file
    },
  },
  base: '/', // Public path for assets
});