import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import { defineConfig, globalIgnores } from 'eslint/config'

export default defineConfig([
	globalIgnores(['dist']),
	{
		files: ['**/*.{js,jsx}'],
		extends: [
			js.configs.recommended,
			reactHooks.configs.flat.recommended,
			reactRefresh.configs.vite,
		],
		languageOptions: {
			globals:{
	        	...globals.browser,
	        	...globals.node
	      	},
			parserOptions: { ecmaFeatures: { jsx: true } },
		},
		rules: {
    		"react-refresh/only-export-components": [
    			"warn", { allowConstantExport: true }
    		],
    		"max-lines": [
    			"warn", {
    				"max": 300,
    				"skipBlankLines": true,
    				"skipComments": true
    			}
    		],
    		/*"max-lines-per-function": [
    			"warn", {
    				"max": 80,
    				"skipBlankLines": true,
    				"skipComments": true
    			}
    		],
    		"complexity": ["warn", 10],*/
    		// Limpiar código de producción
    		// "no-console": ["warn", { allow: ["warn", "error"] }],
    		// Forzar que los Hooks tengan sus dependencias correctas
    		// "react-hooks/exhaustive-deps": "error"
    	},
	},

])
