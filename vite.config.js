import { fileURLToPath } from 'node:url'
import { defineConfig } from 'vite'

const page = name => fileURLToPath(new URL(name, import.meta.url))

// Two decks in one project: the public product story at `/`, and the partner
// proposal at `/socio/`, both sharing the engine in `src/deck.js`.
export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        producto: page('index.html'),
        socio: page('socio/index.html'),
      },
    },
  },
})
