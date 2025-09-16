import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
  server: {
    // Enable client-side routing for development
    port: 5173,
    host: true,
    // This is crucial for client-side routing
    historyApiFallback: {
      index: '/index.html',
    },
  },
  build: {
    // Ensure proper routing for production builds
    rollupOptions: {
      output: {
        manualChunks: undefined,
      },
    },
    outDir: 'dist',
  },
  preview: {
    // Enable client-side routing for preview mode
    port: 4173,
    host: true,
    historyApiFallback: {
      index: '/index.html',
    },
  },
});
