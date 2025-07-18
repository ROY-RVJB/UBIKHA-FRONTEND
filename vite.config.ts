import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0',
    port: 5175,  // ← CRÍTICO: Debe ser 5175 para CORS
    open:true
  }
})