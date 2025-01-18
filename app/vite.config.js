import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import fs from 'fs';

export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0',
    port: 3000,
    https: {
      key: fs.readFileSync('../server/certs/privkey.pem'),
      cert: fs.readFileSync('../server/certs/fullchain.pem'),
      minVersion: 'TLSv1.2',
      ciphers: 'HIGH:!aNULL:!MD5'
    },
    proxy: {
      '/socket.io': {
        target: 'https://192.168.29.230:4443',
        changeOrigin: true,
        secure: false,
        ws: true
      }
    },
    watch: {
      usePolling: true
    },
    cors: true
  },
  define: {
    'process.env': {}
  }
});