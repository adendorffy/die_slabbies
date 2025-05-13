import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: "/", // ensure it's not a subpath
  server: {
    historyApiFallback: true,
  },
});
