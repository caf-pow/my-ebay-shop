import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  // 自分のリポジトリ名を / で囲んで書いてください（例: '/my-ebay-shop/'）
  base: '/my-ebay-shop/', 
})
