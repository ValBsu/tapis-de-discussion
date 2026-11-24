/// <reference types="vitest/config" />
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  test: {
    // Les tests de logique n'ont pas besoin de navigateur : environnement Node, plus rapide.
    environment: 'node',
  },
})
