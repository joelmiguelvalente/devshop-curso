// src/routes/GestionRoutes.jsx
import { Routes, Route } from "react-router";
import Dashboard from '@layout/Dashboard';
import { ProtectedRoute } from "@routes/ProtectedRoute";
import { Welcome } from "@dashboard/index/Welcome";
import { UsuariosPage, UsuariosForm } from "@dashboard/usuarios";
import { ProductosPage, ProductosForm } from "@dashboard/productos";
import { CuponesPage, CuponesForm } from "@dashboard/cupones";
import { CategoriasPage, CategoriasForm } from "@dashboard/categorias";

const MODULOS_CONFIG = [
	{ path: "usuarios", Page: UsuariosPage, Form: UsuariosForm, paramId: "uid" },
	{ path: "productos", Page: ProductosPage, Form: ProductosForm, paramId: "id" },
	{ path: "cupones", Page: CuponesPage, Form: CuponesForm, paramId: "id" },
	{ path: "categorias", Page: CategoriasPage, Form: CategoriasForm, paramId: "id" },
];

export const GestionRoutes = () => {
	return (
		<Routes>
			<Route element={
				<ProtectedRoute rolesPermitidos={['admin']}>
					<Dashboard />
				</ProtectedRoute>
			}>
				<Route path="/" index element={<Welcome />} />

				{MODULOS_CONFIG.map(({ path, Page, Form, paramId }) => {
					return (
						<Route key={path} path={path}>
							<Route index element={<Page />} />
							<Route path="agregar" element={<Form />} />
							<Route path={`editar/:${paramId}`} element={<Form />} />
						</Route>
					)}
				)}

			</Route>
		</Routes>
	);
};
