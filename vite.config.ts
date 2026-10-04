import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: [
        'favicon.ico',
        'favicon-32x32.png',
        'apple-touch-icon.png',
        'robots.txt',
        'sitemap.xml',
        'logo.jpg',
        'offline.html',
      ],
      manifest: {
        name: 'Dra. Marta Peciña — Consulta de Telepsiquiatría',
        short_name: 'Dra. Peciña',
        description:
          'Información y contacto para consulta de telepsiquiatría con la Dra. Marta Peciña, MD, PhD.',
        start_url: '/',
        scope: '/',
        display: 'standalone',
        orientation: 'portrait-primary',
        background_color: '#FAF8F3',
        theme_color: '#1E3A6B',
        lang: 'en',
        icons: [
          { src: 'icons/icon-192x192.png', sizes: '192x192', type: 'image/png' },
          { src: 'icons/icon-512x512.png', sizes: '512x512', type: 'image/png' },
          {
            src: 'icons/icon-512x512-maskable.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'maskable',
          },
          { src: 'apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
        ],
      },
      workbox: {
        // Only static public assets are cached. No form data, no personal
        // data, no third-party messaging content ever touches the cache.
        globPatterns: [
          '**/*.{js,css,html,ico,png,svg,webp,jpg,jpeg,woff2}',
        ],
        navigateFallback: '/offline.html',
        navigateFallbackDenylist: [/^\/api\//],
        runtimeCaching: [
          {
            urlPattern: /^https:\/\/fonts\./i,
            handler: 'CacheFirst',
            options: {
              cacheName: 'fonts',
              expiration: { maxEntries: 20, maxAgeSeconds: 60 * 60 * 24 * 365 },
            },
          },
        ],
      },
      devOptions: { enabled: false },
    }),
  ],
  build: {
    target: 'es2020',
    chunkSizeWarningLimit: 700,
  },
})
