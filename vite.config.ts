import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
   plugins: [react()],
  base: "/Humanize-Ai",
  build: {
    chunkSizeWarningLimit: 1500, // Silences big chunk warnings
  },
});
