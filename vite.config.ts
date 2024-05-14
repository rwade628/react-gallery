import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/v1": {
        target: "http://gallery.home.arpa/",
        changeOrigin: true,
        secure: false,
      },
      "/v2": {
        target: "http://gallery.home.arpa/",
        changeOrigin: true,
        secure: false,
      },
      "/public": {
        target: "http://gallery.home.arpa/",
        changeOrigin: true,
        secure: false,
      },
    },
  },
});
