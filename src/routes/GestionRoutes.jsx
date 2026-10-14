// src/routes/GestionRoutes.jsx
import { Routes, Route } from "react-router";
import Dashboard from '@layout/Dashboard';
import { Welcome } from "@dashboard/index/Welcome";
// Usuarios
import { UsuariosPage } from "@dashboard/usuarios/UsuariosPage";
import { UsuariosForm } from "@dashboard/usuarios/UsuariosForm";
// Productos
import { ProductosPage } from "@dashboard/productos/ProductosPage";
import { ProductosForm } from "@dashboard/productos/ProductosForm";
// Productos
import { CuponesPage } from "@dashboard/cupones/CuponesPage";
import { CuponesForm } from "@dashboard/cupones/CuponesForm";

export const GestionRoutes = () => {
	return (
		<Routes>
			<Route element={<Dashboard />}>
				<Route path="/" index element={<Welcome />} />
				{/* USUARIOS */}
				<Route path="usuarios">
					<Route index element={<UsuariosPage />} />
					<Route path="agregar" element={<UsuariosForm />} />
					<Route path="editar/:uid" element={<UsuariosForm />} />
				</Route>
				{/* PRODUCTOS */}
				<Route path="productos">
					<Route index element={<ProductosPage />} />
					<Route path="agregar" element={<ProductosForm />} />
					<Route path="editar/:id" element={<ProductosForm />} />
				</Route>
				{/* PRODUCTOS */}
				<Route path="cupones">
					<Route index element={<CuponesPage />} />
					<Route path="agregar" element={<CuponesForm />} />
					<Route path="editar/:id" element={<CuponesForm />} />
				</Route>
			</Route>
		</Routes>
	);
};
