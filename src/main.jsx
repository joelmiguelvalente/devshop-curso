// /src/main.jsx
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router } from "react-router";
import { AuthProvider } from '@context/AuthContext';
import { CartProvider } from '@context/CartContext';
import { ProductsProvider } from '@context/ProductsContext';
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
