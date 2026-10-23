// src/routes/AuthRoutes.jsx
import { Routes, Route } from "react-router";
import AuthLayout from '@layout/AuthLayout';

import { Login } from '@pages/auth/Login';
import { Register } from '@pages/auth/Register';

export const AuthRoutes = () => {
	return (
		<Routes>
			<Route element={<AuthLayout />}>
				<Route path="login" element={<Login />} />
				<Route path="register" element={<Register />} />
			</Route>
		</Routes>
	);
};
