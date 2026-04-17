import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: './', // これを入れることで、GitHub Pages上での画像やCSSの読み込みパスを正しく調整します
})
