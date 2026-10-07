// src/app/WebRoutes.jsx
import { Routes, Route } from "react-router";
import Layout from '@layout/Layout';
// Paginas
import { Cart } from '@pages/public/Cart';
import { Favoritos } from "@pages/public/Favoritos";
import { Home as Inicio } from '@pages/public/Home';
import { Politicas } from '@pages/public/Politicas';
import { ProductoDetalle } from '@pages/public/ProductoDetalle';
import { Productos } from "@pages/public/Productos";

export const WebRoutes = () => {
	return (
		<Routes>
			<Route element={<Layout hero={true} />}>
				<Route path="/" element={<Inicio />} />
			</Route>

			<Route element={<Layout hero={false} />}>
				<Route path="carrito" 		element={<Cart />} />
				<Route path="favoritos"		element={<Favoritos />} />
				<Route path="politicas" 	element={<Politicas />} />
				<Route path="producto/:id" 	element={<ProductoDetalle />} />
				<Route path="productos" 	element={<Productos destacados={false} />} />
				<Route path="destacados" 	element={<Productos destacados={true} />} />
			</Route>
		</Routes>
	);
};
