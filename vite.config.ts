import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  define: {
    'process.env': process.env
  },
  server: {
    host: true,
    port: 3000,
    allowedHosts: true
  },
  preview: {
    host: true,
    port: 10000,
    allowedHosts: true
  }
});