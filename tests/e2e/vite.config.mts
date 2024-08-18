import type { UserConfig } from "vite";

export default {
	root: "src/renderer/",
	base: "./",
	build: {
		outDir: "build/",
		emptyOutDir: true,
	},
} satisfies UserConfig;
