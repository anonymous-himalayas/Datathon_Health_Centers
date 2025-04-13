import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import tailwindcss  from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  base: 'https://anonymous-himalayas.github.io/Datathon_Health_Centers'
})
