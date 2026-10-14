// src/app/WebRoutes.jsx
import { Routes, Route } from "react-router";
import { Layout, LayoutWithHero, LayoutSimple as Simple } from '@layout/Layout';
// Paginas
import { Cart } from '@pages/public/Cart';
import { Favoritos } from "@pages/public/Favoritos";
import { Politicas } from '@pages/public/Politicas';
// Home
import { Inicio } from '@pages/public/Home/Inicio';
import { Productos } from "@pages/public/Home/Productos";
// Productos
import { ProductoDetalle } from '@pages/public/Producto/ProductoDetalle';

export const WebRoutes = () => {
	return (
		<Routes>
			<Route element={<LayoutWithHero hero={true} />}>
				<Route path="/" element={<Inicio />} />
			</Route>

			<Route element={<Layout hero={false} />}>
				<Route path="carrito" 		element={<Cart />} />
				<Route path="favoritos"		element={<Favoritos />} />
				<Route path="productos" 	element={<Productos destacados={false} />} />
				<Route path="destacados" 	element={<Productos destacados={true} />} />
				<Route path="/:categoria" 	element={<Productos />} />
				<Route path="productos/:id" element={<ProductoDetalle />} />
			</Route>

			<Route element={<Simple />}>
				<Route path="politicas" element={<Politicas />} />
			</Route>
		</Routes>
	);
};
