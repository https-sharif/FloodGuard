import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react()],
    server: {
        proxy: {
            "/submit-victim": {
                target: "http://localhost:3000",
                changeOrigin: true,
                secure: false,
            },
            "/submit-volunteer": {
                target: "http://localhost:3000",
                changeOrigin: true,
                secure: false,
            },
            "/get-victim": {
                target: "http://localhost:3000",
                changeOrigin: true,
                secure: false,
            },
            "/get-volunteer": {
                target: "http://localhost:3000",
                changeOrigin: true,
                secure: false,
            },
        },
    },
});
