// src/app/WebRoutes.jsx
// Libreria
import { Routes, Route } from "react-router";
// Layout
import { Layout, LayoutWithHero, LayoutSimple as Simple } from '@layout/Layout';
// Secciones
import { Buscar } from '@pages/public/Buscar';
import { Cart } from '@pages/public/Cart';
import { Favoritos } from "@pages/public/Favoritos";
import { Politicas } from '@pages/public/Politicas';
import { Inicio } from '@pages/public/Home/Inicio';
import { Productos } from "@pages/public/Home/Productos";
import { ProductoDetalle } from '@pages/public/Producto/ProductoDetalle';
import { Profile } from '@pages/profile/Profile';

export const WebRoutes = () => {
	return (
		<Routes>
			<Route element={<LayoutWithHero hero={true} />}>
				<Route path="/" element={<Inicio />} />
			</Route>

			<Route element={<Layout hero={false} />}>
				<Route path="carrito" element={<Cart />} />
				<Route path="favoritos" element={<Favoritos />} />
				<Route path="productos" element={<Productos destacados={false} />} />
				<Route path="destacados" element={<Productos destacados={true} />} />
				<Route path="c/:categoria" element={<Productos />} />
				<Route path="productos/:slug" element={<ProductoDetalle />} />
			</Route>

			<Route element={<Simple />}>
				<Route path="buscar" element={<Buscar />} />
				<Route path="perfil" element={<Profile />} />
				<Route path="politicas"	element={<Politicas />} />
			</Route>
		</Routes>
	);
};
