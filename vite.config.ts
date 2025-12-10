import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";
import compression from "vite-plugin-compression";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [
    react(),
    mode === "development" && componentTagger(),
    compression({
      verbose: true,
      disable: false,
      threshold: 10240,
      algorithm: "brotli",
      ext: ".br",
      deleteOriginFile: false,
    }),
    compression({
      verbose: true,
      disable: false,
      threshold: 10240,
      algorithm: "gzip",
      ext: ".gz",
      deleteOriginFile: false,
    }),
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
