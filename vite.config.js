import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'  // ← Esta línea nueva

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),  // ← Y aquí
  ],
})