// /src/main.jsx
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
// Librerias
import { BrowserRouter as Router } from "react-router";
// Contextos
import { AuthProvider } from '@context/AuthContext';
import { CartProvider } from '@context/CartContext';
import { ProductsProvider } from '@context/ProductsContext';
// Aplicacion
import App from './App';

createRoot(document.getElementById('root')).render(
	<StrictMode>
		<Router>
			<AuthProvider>
				<CartProvider>
					<ProductsProvider>
						<App />
					</ProductsProvider>
				</CartProvider>
			</AuthProvider>
		</Router>
	</StrictMode>
)
