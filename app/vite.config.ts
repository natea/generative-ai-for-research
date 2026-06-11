import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // Relative base so the build works from a subpath (e.g. GitHub Pages
  // project sites at /<repo>/). Safe with HashRouter.
  base: './',
})
