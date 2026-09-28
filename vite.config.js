import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react';
// Obtenido desde: https://dev.to/tilly/aliasing-in-vite-w-typescript-1lfo (en comentarios)
import { fileURLToPath } from 'url'
import path from 'path'

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const pathResolve = p => path.resolve(__dirname, `./src${p}`);

const paths = ["assets", "components", "context", "hooks", "layout", "pages", "styles", "utils"];
const automatizado = paths.reduce((acumulador, carpeta) => ({
	...acumulador, [`@${carpeta}`]: pathResolve(`/${carpeta}`)
}), {});

const alias = {
	alias: {
		"@": 			pathResolve(),
		"@fireconfig": 	pathResolve("/firebase"),
		"@ui": 			pathResolve("/components/ui"),
		...automatizado
	}
};

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
	const env = loadEnv(mode, process.cwd(), '');
	return {
		resolve: alias,
		plugins: [react()],
		define: {
            // Creamos el alias global compacto para Firebase
            __FIREBASE_CONFIG__: JSON.stringify({
                apiKey: 			env.VITE_FIREBASE_API_KEY,
                authDomain: 		env.VITE_FIREBASE_AUTH_DOMAIN,
                projectId: 			env.VITE_FIREBASE_PROJECT_ID,
                storageBucket: 		env.VITE_FIREBASE_STORAGE_BUCKET,
                messagingSenderId: 	env.VITE_FIREBASE_MESSAGING_SENDER_ID,
                appId: 				env.VITE_FIREBASE_APP_ID,
                measurementId: 		env.VITE_FIREBASE_MEASUREMENT_ID
            })
        }
	}
})
