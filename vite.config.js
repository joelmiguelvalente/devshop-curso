import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react';
// Obtenido desde: https://dev.to/tilly/aliasing-in-vite-w-typescript-1lfo (en comentarios)
import { fileURLToPath } from 'url'
import path from 'path'

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const pathResolve = subPath => path.resolve(__dirname, `./src${subPath}`);

const paths = [
	"assets", "components", "constants", "context", "hooks", "layout",
	"pages", "routes", "services", "schemas", "styles", "utils"
];
const automatizado = paths.reduce((acumulador, carpeta) => ({
	...acumulador, [`@${carpeta}`]: pathResolve(`/${carpeta}`)
}), {});

const alias = {
	alias: {
		"@": 			pathResolve(),
		"@fireconfig": 	pathResolve("/firebase"),
        "@blocks":      pathResolve("/components/blocks"),
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
		build: {
			sourcemap: false, // Desactivado en producción: evita exponer el código fuente (.map)
			chunkSizeWarningLimit: 1000,
	    	rollupOptions: {
	      		output: {
	        		manualChunks(id) {
	        			if (!id.includes('node_modules')) return;
	        			// Separa las dependencias pesadas en chunks propios para mejor caché y carga paralela
	        			if (id.includes('node_modules/firebase') || id.includes('node_modules/@firebase')) return 'firebase';
	        			if (id.includes('node_modules/lucide-react')) return 'icons';
	        			if (id.includes('node_modules/react') || id.includes('node_modules/react-dom') || id.includes('node_modules/react-router') || id.includes('node_modules/react-hook-form') || id.includes('node_modules/scheduler')) return 'react-vendor';
	        		},
	      		},
	    	},
	  	}
	}
})