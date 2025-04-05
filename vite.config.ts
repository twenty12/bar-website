import { sentryVitePlugin } from "@sentry/vite-plugin";
import { defineConfig } from "vite";
import react from '@vitejs/plugin-react-swc'

export default defineConfig({
  plugins: [react(), sentryVitePlugin({
    org: "honeys",
    project: "javascript-react"
  })],
  build: {
    // Output directory
    outDir: 'dist',

    // Clears the output directory before building
    emptyOutDir: true,

    rollupOptions: {
      input: './index.html', // Ensure Vite uses the correct input file
    },

    sourcemap: true
  },
  base: '/', // Public path for assets
});