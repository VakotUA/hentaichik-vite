import react from '@vitejs/plugin-react-swc'
import { defineConfig } from 'vite'

export default defineConfig({
  resolve: {
    alias: {
      '@components': '/components',
      '@styles': '/styles',
      '@modules': '/modules',
      '@utils': '/utils',
      '@assets': '/assets',
      '@pages': '/pages',
    },
  },
  base: '/hentaichik-vite',
  plugins: [react()],
})
