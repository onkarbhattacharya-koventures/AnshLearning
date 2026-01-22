import { defineConfig } from "tsup";

export default defineConfig({
    entry: ["src/web-component.tsx"],
    format: ["iife"],
    globalName: "LanguageKids",
    dts: false,
    minify: true,
    clean: true,
    target: "es2020",
    // Bundle everything into a single file
    noExternal: [
        "lucide-react",
        "clsx",
        "tailwind-merge",
        "embla-carousel-react",
        "@radix-ui/react-tabs",
        "@radix-ui/react-radio-group",
        "@radix-ui/react-label",
        "@radix-ui/react-select",
        "@radix-ui/react-popover",
        "@radix-ui/react-dialog",
        "@radix-ui/react-accordion",
        "@radix-ui/react-progress",
        "class-variance-authority",
        "tailwindcss-animate",
        "@r2wc/react-to-web-component",
        "react",
        "react-dom",
        "date-fns",
        "zod"
    ],
    esbuildOptions(options) {
        options.loader = {
            ".css": "text",
        };
        // Handle path aliases manually if tsup/esbuild doesn't
        options.alias = {
            "@": "./src"
        };
    },
});
