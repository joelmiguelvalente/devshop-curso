import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react';
// Obtenido desde: https://dev.to/tilly/aliasing-in-vite-w-typescript-1lfo (en comentarios)
import { fileURLToPath } from 'url'
import path from 'path'

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const pathResolve = subPath => path.resolve(__dirname, `./src${subPath}`);

const paths = [
	"assets", "components", "context", "hooks", "layout", "pages",
	"routes", "services", "schemas", "styles", "utils"
];
const automatizado = paths.reduce((acumulador, carpeta) => ({
	...acumulador, [`@${carpeta}`]: pathResolve(`/${carpeta}`)
}), {});

const alias = {
	alias: {
		"@": 			pathResolve(),
		"@fireconfig": 	pathResolve("/firebase"),
        "@ui":          pathResolve("/components/ui"),
		"@dashboard": 	pathResolve("/pages/admin"),
		"@public": 		pathResolve("/pages/public"),
		...automatizado
	}
};

// https://vite.dev/config/
export default defineConfig(() => {
	return {
		resolve: alias,
		plugins: [react()],
	}
})
