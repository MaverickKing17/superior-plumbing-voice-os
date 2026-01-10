import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import process from 'node:process';

export default defineConfig(({ mode }) => {
  // Use process.cwd() from the node:process module to get the project root correctly in a TypeScript environment
  const env = loadEnv(mode, process.cwd(), '');
  return {
    plugins: [react()],
    define: {
      'process.env.API_KEY': JSON.stringify(env.API_KEY),
      // Fallback for general process.env usage in third-party libs
      'process.env': {
        API_KEY: env.API_KEY
      }
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
  };
});
