// src/routes/GestionRoutes.jsx
import { Routes, Route } from "react-router";
import Dashboard from '@layout/Dashboard';
import { Welcome } from "@dashboard/index/Welcome";
// Usuarios
import { Usuarios } from "@dashboard/usuarios/Usuarios";
import { EditarUsuario } from "@dashboard/usuarios/EditarUsuario";
import { AgregarUsuario } from "@dashboard/usuarios/AgregarUsuario";
// Productos
import { Productos } from "@dashboard/productos/Productos";
import { AgregarProducto } from "@dashboard/productos/AgregarProducto";
import { EditarProducto } from "@dashboard/productos/EditarProducto";

export const GestionRoutes = () => {
	return (
		<Routes>
			<Route element={<Dashboard />}>
				<Route path="/" index element={<Welcome />} />
				{/* USUARIOS */}
				<Route path="usuarios">
					<Route index element={<Usuarios />} />
					<Route path="agregar" element={<AgregarUsuario />} />
					<Route path="editar/:uid" element={<EditarUsuario />} />
				</Route>
				{/* PRODUCTOS */}
				<Route path="productos">
					<Route index element={<Productos />} />
					<Route path="agregar" element={<AgregarProducto />} />
					<Route path="editar/:id" element={<EditarProducto />} />
				</Route>
			</Route>
		</Routes>
	);
};
