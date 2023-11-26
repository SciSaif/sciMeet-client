// vite.config.ts
import { defineConfig } from "file:///D:/Web%20Development/projects/sciMeet/client/node_modules/vite/dist/node/index.js";
import react from "file:///D:/Web%20Development/projects/sciMeet/client/node_modules/@vitejs/plugin-react/dist/index.mjs";
import { nodePolyfills } from "file:///D:/Web%20Development/projects/sciMeet/client/node_modules/vite-plugin-node-polyfills/dist/index.js";
import { VitePWA } from "file:///D:/Web%20Development/projects/sciMeet/client/node_modules/vite-plugin-pwa/dist/index.js";
var manifestForPlugin = {
  // registerType: "prompt",
  // includeAssets: ["favicon.ico", "apple-touch-icon.png", "masked-icon.svg"],
  manifest: {
    name: "SciMeet ",
    short_name: "SciMeet",
    description: "SciMeet: Bridging the Distance with Every Message. Your Ultimate Chat, Video, and Group Calling App",
    icons: [
      {
        src: "pwa-192x192.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "any"
      },
      {
        src: "pwa-512x512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "any"
      },
      // {
      //     src: "maskable-icon-512x512.png",
      //     sizes: "512x512",
      //     type: "image/png",
      //     purpose: "maskable",
      // },
      {
        src: "maskable-icon-512x512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "any"
      },
      {
        src: "apple-touch-icon-180x180.png",
        sizes: "180x180",
        type: "image/png",
        purpose: "any"
      }
    ],
    theme_color: "#14b8a6",
    background_color: "#1e293b",
    display: "standalone"
  }
};
var vite_config_default = defineConfig({
  plugins: [
    react(),
    VitePWA(manifestForPlugin),
    nodePolyfills({
      // To exclude specific polyfills, add them to this list.
      exclude: [
        "fs"
        // Excludes the polyfill for `fs` and `node:fs`.
      ],
      // Whether to polyfill specific globals.
      globals: {
        Buffer: true,
        // can also be 'build', 'dev', or false
        global: true,
        process: true
      },
      // Whether to polyfill `node:` protocol imports.
      protocolImports: true
    })
  ]
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJEOlxcXFxXZWIgRGV2ZWxvcG1lbnRcXFxccHJvamVjdHNcXFxcc2NpTWVldFxcXFxjbGllbnRcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIkQ6XFxcXFdlYiBEZXZlbG9wbWVudFxcXFxwcm9qZWN0c1xcXFxzY2lNZWV0XFxcXGNsaWVudFxcXFx2aXRlLmNvbmZpZy50c1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vRDovV2ViJTIwRGV2ZWxvcG1lbnQvcHJvamVjdHMvc2NpTWVldC9jbGllbnQvdml0ZS5jb25maWcudHNcIjtpbXBvcnQgeyBkZWZpbmVDb25maWcgfSBmcm9tIFwidml0ZVwiO1xuaW1wb3J0IHJlYWN0IGZyb20gXCJAdml0ZWpzL3BsdWdpbi1yZWFjdFwiO1xuaW1wb3J0IHsgbm9kZVBvbHlmaWxscyB9IGZyb20gXCJ2aXRlLXBsdWdpbi1ub2RlLXBvbHlmaWxsc1wiO1xuaW1wb3J0IHsgVml0ZVBXQSwgVml0ZVBXQU9wdGlvbnMgfSBmcm9tIFwidml0ZS1wbHVnaW4tcHdhXCI7XG5cbi8vaWdub3JlIGZpbGUgd2ViLmNvbmZpZ1xuXG5jb25zdCBtYW5pZmVzdEZvclBsdWdpbjogUGFydGlhbDxWaXRlUFdBT3B0aW9ucz4gPSB7XG4gICAgLy8gcmVnaXN0ZXJUeXBlOiBcInByb21wdFwiLFxuICAgIC8vIGluY2x1ZGVBc3NldHM6IFtcImZhdmljb24uaWNvXCIsIFwiYXBwbGUtdG91Y2gtaWNvbi5wbmdcIiwgXCJtYXNrZWQtaWNvbi5zdmdcIl0sXG4gICAgbWFuaWZlc3Q6IHtcbiAgICAgICAgbmFtZTogXCJTY2lNZWV0IFwiLFxuICAgICAgICBzaG9ydF9uYW1lOiBcIlNjaU1lZXRcIixcbiAgICAgICAgZGVzY3JpcHRpb246XG4gICAgICAgICAgICBcIlNjaU1lZXQ6IEJyaWRnaW5nIHRoZSBEaXN0YW5jZSB3aXRoIEV2ZXJ5IE1lc3NhZ2UuIFlvdXIgVWx0aW1hdGUgQ2hhdCwgVmlkZW8sIGFuZCBHcm91cCBDYWxsaW5nIEFwcFwiLFxuICAgICAgICBpY29uczogW1xuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIHNyYzogXCJwd2EtMTkyeDE5Mi5wbmdcIixcbiAgICAgICAgICAgICAgICBzaXplczogXCIxOTJ4MTkyXCIsXG4gICAgICAgICAgICAgICAgdHlwZTogXCJpbWFnZS9wbmdcIixcbiAgICAgICAgICAgICAgICBwdXJwb3NlOiBcImFueVwiLFxuICAgICAgICAgICAgfSxcblxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIHNyYzogXCJwd2EtNTEyeDUxMi5wbmdcIixcbiAgICAgICAgICAgICAgICBzaXplczogXCI1MTJ4NTEyXCIsXG4gICAgICAgICAgICAgICAgdHlwZTogXCJpbWFnZS9wbmdcIixcbiAgICAgICAgICAgICAgICBwdXJwb3NlOiBcImFueVwiLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIC8vIHtcbiAgICAgICAgICAgIC8vICAgICBzcmM6IFwibWFza2FibGUtaWNvbi01MTJ4NTEyLnBuZ1wiLFxuICAgICAgICAgICAgLy8gICAgIHNpemVzOiBcIjUxMng1MTJcIixcbiAgICAgICAgICAgIC8vICAgICB0eXBlOiBcImltYWdlL3BuZ1wiLFxuICAgICAgICAgICAgLy8gICAgIHB1cnBvc2U6IFwibWFza2FibGVcIixcbiAgICAgICAgICAgIC8vIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgc3JjOiBcIm1hc2thYmxlLWljb24tNTEyeDUxMi5wbmdcIixcbiAgICAgICAgICAgICAgICBzaXplczogXCI1MTJ4NTEyXCIsXG4gICAgICAgICAgICAgICAgdHlwZTogXCJpbWFnZS9wbmdcIixcbiAgICAgICAgICAgICAgICBwdXJwb3NlOiBcImFueVwiLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBzcmM6IFwiYXBwbGUtdG91Y2gtaWNvbi0xODB4MTgwLnBuZ1wiLFxuICAgICAgICAgICAgICAgIHNpemVzOiBcIjE4MHgxODBcIixcbiAgICAgICAgICAgICAgICB0eXBlOiBcImltYWdlL3BuZ1wiLFxuICAgICAgICAgICAgICAgIHB1cnBvc2U6IFwiYW55XCIsXG4gICAgICAgICAgICB9LFxuICAgICAgICBdLFxuICAgICAgICB0aGVtZV9jb2xvcjogXCIjMTRiOGE2XCIsXG4gICAgICAgIGJhY2tncm91bmRfY29sb3I6IFwiIzFlMjkzYlwiLFxuICAgICAgICBkaXNwbGF5OiBcInN0YW5kYWxvbmVcIixcbiAgICB9LFxufTtcbi8vIGh0dHBzOi8vdml0ZWpzLmRldi9jb25maWcvXG5leHBvcnQgZGVmYXVsdCBkZWZpbmVDb25maWcoe1xuICAgIHBsdWdpbnM6IFtcbiAgICAgICAgcmVhY3QoKSxcblxuICAgICAgICBWaXRlUFdBKG1hbmlmZXN0Rm9yUGx1Z2luKSxcbiAgICAgICAgbm9kZVBvbHlmaWxscyh7XG4gICAgICAgICAgICAvLyBUbyBleGNsdWRlIHNwZWNpZmljIHBvbHlmaWxscywgYWRkIHRoZW0gdG8gdGhpcyBsaXN0LlxuICAgICAgICAgICAgZXhjbHVkZTogW1xuICAgICAgICAgICAgICAgIFwiZnNcIiwgLy8gRXhjbHVkZXMgdGhlIHBvbHlmaWxsIGZvciBgZnNgIGFuZCBgbm9kZTpmc2AuXG4gICAgICAgICAgICBdLFxuICAgICAgICAgICAgLy8gV2hldGhlciB0byBwb2x5ZmlsbCBzcGVjaWZpYyBnbG9iYWxzLlxuICAgICAgICAgICAgZ2xvYmFsczoge1xuICAgICAgICAgICAgICAgIEJ1ZmZlcjogdHJ1ZSwgLy8gY2FuIGFsc28gYmUgJ2J1aWxkJywgJ2RldicsIG9yIGZhbHNlXG4gICAgICAgICAgICAgICAgZ2xvYmFsOiB0cnVlLFxuICAgICAgICAgICAgICAgIHByb2Nlc3M6IHRydWUsXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgLy8gV2hldGhlciB0byBwb2x5ZmlsbCBgbm9kZTpgIHByb3RvY29sIGltcG9ydHMuXG4gICAgICAgICAgICBwcm90b2NvbEltcG9ydHM6IHRydWUsXG4gICAgICAgIH0pLFxuICAgIF0sXG59KTtcbiJdLAogICJtYXBwaW5ncyI6ICI7QUFBNFQsU0FBUyxvQkFBb0I7QUFDelYsT0FBTyxXQUFXO0FBQ2xCLFNBQVMscUJBQXFCO0FBQzlCLFNBQVMsZUFBK0I7QUFJeEMsSUFBTSxvQkFBNkM7QUFBQTtBQUFBO0FBQUEsRUFHL0MsVUFBVTtBQUFBLElBQ04sTUFBTTtBQUFBLElBQ04sWUFBWTtBQUFBLElBQ1osYUFDSTtBQUFBLElBQ0osT0FBTztBQUFBLE1BQ0g7QUFBQSxRQUNJLEtBQUs7QUFBQSxRQUNMLE9BQU87QUFBQSxRQUNQLE1BQU07QUFBQSxRQUNOLFNBQVM7QUFBQSxNQUNiO0FBQUEsTUFFQTtBQUFBLFFBQ0ksS0FBSztBQUFBLFFBQ0wsT0FBTztBQUFBLFFBQ1AsTUFBTTtBQUFBLFFBQ04sU0FBUztBQUFBLE1BQ2I7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxNQU9BO0FBQUEsUUFDSSxLQUFLO0FBQUEsUUFDTCxPQUFPO0FBQUEsUUFDUCxNQUFNO0FBQUEsUUFDTixTQUFTO0FBQUEsTUFDYjtBQUFBLE1BQ0E7QUFBQSxRQUNJLEtBQUs7QUFBQSxRQUNMLE9BQU87QUFBQSxRQUNQLE1BQU07QUFBQSxRQUNOLFNBQVM7QUFBQSxNQUNiO0FBQUEsSUFDSjtBQUFBLElBQ0EsYUFBYTtBQUFBLElBQ2Isa0JBQWtCO0FBQUEsSUFDbEIsU0FBUztBQUFBLEVBQ2I7QUFDSjtBQUVBLElBQU8sc0JBQVEsYUFBYTtBQUFBLEVBQ3hCLFNBQVM7QUFBQSxJQUNMLE1BQU07QUFBQSxJQUVOLFFBQVEsaUJBQWlCO0FBQUEsSUFDekIsY0FBYztBQUFBO0FBQUEsTUFFVixTQUFTO0FBQUEsUUFDTDtBQUFBO0FBQUEsTUFDSjtBQUFBO0FBQUEsTUFFQSxTQUFTO0FBQUEsUUFDTCxRQUFRO0FBQUE7QUFBQSxRQUNSLFFBQVE7QUFBQSxRQUNSLFNBQVM7QUFBQSxNQUNiO0FBQUE7QUFBQSxNQUVBLGlCQUFpQjtBQUFBLElBQ3JCLENBQUM7QUFBQSxFQUNMO0FBQ0osQ0FBQzsiLAogICJuYW1lcyI6IFtdCn0K
