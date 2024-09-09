import { defineConfig, type PluginOption } from "vite";
import preact from "@preact/preset-vite";
import path from "path";
import { visualizer } from "rollup-plugin-visualizer";

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [preact(), visualizer() as PluginOption],
    base: "./",
    build: {
        outDir: "../dist/",
        emptyOutDir: true,
    },
    resolve: {
        alias: {
            "@": path.resolve(__dirname, "./src"),
            "~": path.resolve(__dirname, "./"),
        },
    },
});
