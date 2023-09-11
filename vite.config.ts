import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { nodePolyfills } from "vite-plugin-node-polyfills";
import { VitePWA, VitePWAOptions } from "vite-plugin-pwa";

//ignore file web.config

const manifestForPlugin: Partial<VitePWAOptions> = {
    registerType: "prompt",
    includeAssets: ["favicon.ico", "apple-touch-icon.png", "masked-icon.svg"],
    manifest: {
        name: "SciMeet: Your Ultimate Chat, Video, and Group Calling App",
        short_name: "SciMeet",
        description: "SciMeet: Bridging the Distance with Every Message.",
        icons: [
            {
                src: "src/assets/pwa/manifest-icon-192.maskable.png",
                sizes: "192x192",
                type: "image/png",
                purpose: "any",
            },
            {
                src: "src/assets/pwa/manifest-icon-192.maskable.png",
                sizes: "192x192",
                type: "image/png",
                purpose: "maskable",
            },
            {
                src: "src/assets/pwa/manifest-icon-512.maskable.png",
                sizes: "512x512",
                type: "image/png",
                purpose: "any",
            },
            {
                src: "src/assets/pwa/manifest-icon-512.maskable.png",
                sizes: "512x512",
                type: "image/png",
                purpose: "maskable",
            },
            {
                src: "/apple-touch-icon.png",
                sizes: "180x180",
                type: "image/png",
                purpose: "any",
            },
            {
                src: "/maskable_icon.png",
                sizes: "225x225",
                type: "image/png",
                purpose: "maskable",
            },
        ],
        theme_color: "#14b8a6",
        background_color: "#1e293b",
        display: "standalone",
        scope: "/",
        start_url: "/",
        orientation: "portrait",
    },
};
// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        react(),
        VitePWA({
            manifest: {
                icons: [
                    {
                        src: "maskable-icon-512x512.png",
                        sizes: "512x512",
                        type: "image/png",
                        purpose: "any maskable",
                    },
                ],
            },
        }),
        // VitePWA({
        //     registerType: "autoUpdate",
        //     devOptions: {
        //         enabled: true,
        //     },
        // }),
        // VitePWA(manifestForPlugin),
        nodePolyfills({
            // To exclude specific polyfills, add them to this list.
            exclude: [
                "fs", // Excludes the polyfill for `fs` and `node:fs`.
            ],
            // Whether to polyfill specific globals.
            globals: {
                Buffer: true, // can also be 'build', 'dev', or false
                global: true,
                process: true,
            },
            // Whether to polyfill `node:` protocol imports.
            protocolImports: true,
        }),
    ],
});
