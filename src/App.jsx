// /src/App.jsx
// Libreria
import { Routes, Route } from "react-router";
// Rutas
import { WebRoutes } from "@routes/WebRoutes";
import { GestionRoutes } from "@routes/GestionRoutes";
import { AuthRoutes } from "@routes/AuthRoutes";
// Seccion
import { Error404 } from '@pages/global/Error404';

// Personalizacion
import '@styles/tokens.css';
import '@styles/index.scss';
import '@styles/components.scss';

const App = () => {

    // https://reactrouter.com/start/declarative/routing
	return (
		<Routes>
			<Route>
				{/* Rutas de Administración: Todo lo que empiece con /admin/ va aquí */}
				<Route path="/admin/*" element={<GestionRoutes />} />
				{/* Rutas de Autenticación: Todo lo que empiece con /auth/ va aquí */}
				<Route path="/auth/*" element={<AuthRoutes />} />
				{/* Rutas de la Web Pública: El resto de URLs individuales */}
				<Route path="/*" element={<WebRoutes />} />
				{/* Si ninguna ruta de los archivos anteriores coincide, cae en el 404 global */}
				<Route path="*" element={<Error404 />} />
  			</Route>
	 	</Routes>
	);
}

export default App;