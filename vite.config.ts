import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    allowedHosts: [
      'localhost',
      '127.0.0.1',
      '0.0.0.0',
      '5173-ih9f8peimvmozhi3qx0jo-1e9aa0bd.us2.manus.computer',
      '.us2.manus.computer',
      '.manus.computer'
    ],
    host: '0.0.0.0',
    port: 5173,
  }
})
