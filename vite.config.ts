import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [
    react(),
    mode === "development" && componentTagger(),
    // Note: Compression is disabled here and handled by Netlify instead
    // vite-plugin-compression was causing ERR_CONTENT_DECODING_FAILED in production
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    // Image optimization settings
    assetsInlineLimit: 4096, // Images smaller than 4KB will be inlined
    rollupOptions: {
      output: {
        manualChunks: {
          // Split vendor chunks for better caching
          "react-vendor": ["react", "react-dom", "react-router-dom"],
        },
      },
    },
    // Optimize CSS, JS compression
    minify: "terser",
    terserOptions: {
      compress: {
        drop_console: true,
      },
    },
  },
  // Performance hints
  ssr: {
    noExternal: [],
  },
}));
