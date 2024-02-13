import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    open: true,
    port: 3000,
    proxy: {
      "/graphql": {
        target: "http://127.0.0.1:3001",
        changeOrigin: true,
        secure: false,
      },
      "/create-checkout-session": {
        target: "http://localhost:4242",
        changeOrigin: true,
      },
    },
  },
});
