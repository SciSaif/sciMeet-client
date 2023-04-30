import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

//ignore file web.config

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react()],
});
