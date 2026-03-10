import path from "path"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"
import { inspectAttr } from 'kimi-plugin-inspect-react'

// https://vite.dev/config/
export default defineConfig({
  base: './',
  plugins: [inspectAttr(), react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    target: 'esnext',
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
      },
    },
    rollupOptions: {
      output: {
        manualChunks: (id) => {
          // Vendor chunks - split large dependencies
          if (id.includes('node_modules')) {
            if (id.includes('react')) {
              return 'vendor-react';
            }
            if (id.includes('@radix-ui')) {
              return 'vendor-radix';
            }
            if (id.includes('recharts')) {
              return 'vendor-recharts';
            }
            if (id.includes('date-fns')) {
              return 'vendor-datefns';
            }
            if (id.includes('lucide-react')) {
              return 'vendor-lucide';
            }
            if (id.includes('html-to-image') || id.includes('qrcode')) {
              return 'vendor-utils';
            }
            return 'vendor-other';
          }
          
          // App chunks - split by feature
          if (id.includes('src/lib/duaData')) {
            return 'app-dua-data';
          }
          if (id.includes('src/sections')) {
            const match = id.match(/sections\/([^/]+)\.tsx/);
            if (match) {
              return `app-section-${match[1].toLowerCase()}`;
            }
          }
          if (id.includes('src/components/ui')) {
            return 'app-ui-components';
          }
        },
      },
    },
    chunkSizeWarningLimit: 1000,
  },
});
