// vite.config.ts
import { defineConfig } from "file:///D:/Web%20Development/projects/sciMeet/client/node_modules/vite/dist/node/index.js";
import react from "file:///D:/Web%20Development/projects/sciMeet/client/node_modules/@vitejs/plugin-react/dist/index.mjs";
import { nodePolyfills } from "file:///D:/Web%20Development/projects/sciMeet/client/node_modules/vite-plugin-node-polyfills/dist/index.js";
var vite_config_default = defineConfig({
  plugins: [
    react(),
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
  // define: {
  //     // By default, Vite doesn't include shims for NodeJS/
  //     // necessary for segment analytics lib to work
  //     global: {},
  // },
  // resolve: {
  //     alias: {
  //         // polyfills
  //         Buffer: "vite-compatible-readable-buffer",
  //         stream: "vite-compatible-readable-stream",
  //         util: "rollup-plugin-node-polyfills/polyfills/util",
  //     },
  // },
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJEOlxcXFxXZWIgRGV2ZWxvcG1lbnRcXFxccHJvamVjdHNcXFxcc2NpTWVldFxcXFxjbGllbnRcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIkQ6XFxcXFdlYiBEZXZlbG9wbWVudFxcXFxwcm9qZWN0c1xcXFxzY2lNZWV0XFxcXGNsaWVudFxcXFx2aXRlLmNvbmZpZy50c1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vRDovV2ViJTIwRGV2ZWxvcG1lbnQvcHJvamVjdHMvc2NpTWVldC9jbGllbnQvdml0ZS5jb25maWcudHNcIjtpbXBvcnQgeyBkZWZpbmVDb25maWcgfSBmcm9tIFwidml0ZVwiO1xuaW1wb3J0IHJlYWN0IGZyb20gXCJAdml0ZWpzL3BsdWdpbi1yZWFjdFwiO1xuaW1wb3J0IHsgbm9kZVBvbHlmaWxscyB9IGZyb20gXCJ2aXRlLXBsdWdpbi1ub2RlLXBvbHlmaWxsc1wiO1xuLy9pZ25vcmUgZmlsZSB3ZWIuY29uZmlnXG5cbi8vIGh0dHBzOi8vdml0ZWpzLmRldi9jb25maWcvXG5leHBvcnQgZGVmYXVsdCBkZWZpbmVDb25maWcoe1xuICAgIHBsdWdpbnM6IFtcbiAgICAgICAgcmVhY3QoKSxcbiAgICAgICAgbm9kZVBvbHlmaWxscyh7XG4gICAgICAgICAgICAvLyBUbyBleGNsdWRlIHNwZWNpZmljIHBvbHlmaWxscywgYWRkIHRoZW0gdG8gdGhpcyBsaXN0LlxuICAgICAgICAgICAgZXhjbHVkZTogW1xuICAgICAgICAgICAgICAgIFwiZnNcIiwgLy8gRXhjbHVkZXMgdGhlIHBvbHlmaWxsIGZvciBgZnNgIGFuZCBgbm9kZTpmc2AuXG4gICAgICAgICAgICBdLFxuICAgICAgICAgICAgLy8gV2hldGhlciB0byBwb2x5ZmlsbCBzcGVjaWZpYyBnbG9iYWxzLlxuICAgICAgICAgICAgZ2xvYmFsczoge1xuICAgICAgICAgICAgICAgIEJ1ZmZlcjogdHJ1ZSwgLy8gY2FuIGFsc28gYmUgJ2J1aWxkJywgJ2RldicsIG9yIGZhbHNlXG4gICAgICAgICAgICAgICAgZ2xvYmFsOiB0cnVlLFxuICAgICAgICAgICAgICAgIHByb2Nlc3M6IHRydWUsXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgLy8gV2hldGhlciB0byBwb2x5ZmlsbCBgbm9kZTpgIHByb3RvY29sIGltcG9ydHMuXG4gICAgICAgICAgICBwcm90b2NvbEltcG9ydHM6IHRydWUsXG4gICAgICAgIH0pLFxuICAgIF0sXG4gICAgLy8gZGVmaW5lOiB7XG4gICAgLy8gICAgIC8vIEJ5IGRlZmF1bHQsIFZpdGUgZG9lc24ndCBpbmNsdWRlIHNoaW1zIGZvciBOb2RlSlMvXG4gICAgLy8gICAgIC8vIG5lY2Vzc2FyeSBmb3Igc2VnbWVudCBhbmFseXRpY3MgbGliIHRvIHdvcmtcbiAgICAvLyAgICAgZ2xvYmFsOiB7fSxcbiAgICAvLyB9LFxuXG4gICAgLy8gcmVzb2x2ZToge1xuICAgIC8vICAgICBhbGlhczoge1xuICAgIC8vICAgICAgICAgLy8gcG9seWZpbGxzXG4gICAgLy8gICAgICAgICBCdWZmZXI6IFwidml0ZS1jb21wYXRpYmxlLXJlYWRhYmxlLWJ1ZmZlclwiLFxuICAgIC8vICAgICAgICAgc3RyZWFtOiBcInZpdGUtY29tcGF0aWJsZS1yZWFkYWJsZS1zdHJlYW1cIixcbiAgICAvLyAgICAgICAgIHV0aWw6IFwicm9sbHVwLXBsdWdpbi1ub2RlLXBvbHlmaWxscy9wb2x5ZmlsbHMvdXRpbFwiLFxuICAgIC8vICAgICB9LFxuICAgIC8vIH0sXG59KTtcbiJdLAogICJtYXBwaW5ncyI6ICI7QUFBNFQsU0FBUyxvQkFBb0I7QUFDelYsT0FBTyxXQUFXO0FBQ2xCLFNBQVMscUJBQXFCO0FBSTlCLElBQU8sc0JBQVEsYUFBYTtBQUFBLEVBQ3hCLFNBQVM7QUFBQSxJQUNMLE1BQU07QUFBQSxJQUNOLGNBQWM7QUFBQTtBQUFBLE1BRVYsU0FBUztBQUFBLFFBQ0w7QUFBQTtBQUFBLE1BQ0o7QUFBQTtBQUFBLE1BRUEsU0FBUztBQUFBLFFBQ0wsUUFBUTtBQUFBO0FBQUEsUUFDUixRQUFRO0FBQUEsUUFDUixTQUFTO0FBQUEsTUFDYjtBQUFBO0FBQUEsTUFFQSxpQkFBaUI7QUFBQSxJQUNyQixDQUFDO0FBQUEsRUFDTDtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBZUosQ0FBQzsiLAogICJuYW1lcyI6IFtdCn0K
