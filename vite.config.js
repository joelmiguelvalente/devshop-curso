import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
// Obtenido desde: https://dev.to/tilly/aliasing-in-vite-w-typescript-1lfo (en comentarios)
import { fileURLToPath } from 'url'
import path from 'path'

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// https://vite.dev/config/
export default defineConfig({
	resolve: {
		alias: {
			"@": 			path.resolve(__dirname, "./src"),
			"@assets": 		path.resolve(__dirname, "./src/assets"),
			"@components": 	path.resolve(__dirname, "./src/components"),
			"@hooks": 		path.resolve(__dirname, "./src/hooks"),
			"@layout": 		path.resolve(__dirname, "./src/layout"),
			"@pages": 		path.resolve(__dirname, "./src/pages"),
			"@ui": 			path.resolve(__dirname, "./src/components/ui"),
			"@utils": 		path.resolve(__dirname, "./src/utils"),
		},
	},
	plugins: [react()],
})
