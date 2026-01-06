
import { defineConfig } from 'vite';

export default defineConfig({
  // This section allows the app to run on Render.com and other external hosts
  server: {
    allowedHosts: true,
  },
  preview: {
    allowedHosts: true,
  }
});
