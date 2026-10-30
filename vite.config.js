import { defineConfig } from 'vite'
import { readFileSync } from 'node:fs'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  base: '/Portfolio/',
  plugins: [react(), tailwindcss(), {
    name: 'inline-intro-critical-css',
    transformIndexHtml: { order: 'post', handler: () => [{ tag: 'style', attrs: { id: 'intro-critical' }, children: readFileSync(new URL('./src/components/Hero/hero-loader.css', import.meta.url), 'utf8').replaceAll('__BASE__', '/Portfolio/'), injectTo: 'head-prepend' }] },
  }],
})
