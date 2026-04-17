import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  // どんなリポジトリ名でも動くように、相対パス（./）を徹底します
  base: './', 
  build: {
    outDir: 'dist',
  }
})
