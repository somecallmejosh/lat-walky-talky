import { enabled } from 'virtual:nuxt-pwa-configuration'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ['@vite-pwa/nuxt'],
  pwa: {
    manifest: {
      description: 'Installable LogATot application for hand held devices',
      icons: [
        {
          src: '/icon-16x16.png',
          sizes: '16x16',
          type: 'image/png',
        },
        {
          src: '/icon-32x32.png',
          sizes: '32x32',
          type: 'image/png',
        },
        {
          src: '/icon-144x144.png',
          sizes: '144x144',
          type: 'image/png',
        },
        {
          src: '/icon-192x192.png',
          sizes: '192x192',
          type: 'image/png',
        },
        {
          src: '/icon-512x512.png',
          sizes: '512x512',
          type: 'image/png',
        },
      ],
      id: '/',
      name: 'LogATot Walky Talky',
      orientation: 'landscape',
      short_name: 'LogATot',
      start_url: '/',
      theme_color: '#EDC551',
    },
    workbox: {
      navigateFallback: '/',
      cleanupOutdatedCaches: true,
    },
    devOptions: {
      enabled: true,
      type: 'module',
    },
  },
  plugins: [{ src: '~/plugins/porcupineConfig.js', mode: 'client' }],
})
