// /src/main.jsx
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router } from "react-router";
import { CartProvider } from '@context/CartContext.jsx';
import App from './App.jsx';

createRoot(document.getElementById('root')).render(
	<StrictMode>
		<Router>
			<CartProvider>
				<App />
			</CartProvider>
		</Router>
	</StrictMode>
)
