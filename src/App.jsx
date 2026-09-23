// /src/App.jsx
import { Routes, Route } from "react-router";

// Layout, componentes y configuraciones
import Layout from '@layout/Layout';
import { FormularioContainer as Formulario } from "@components/Formulario/FormularioContainer";
import { Home as Inicio } from '@pages/Home';
import { Politicas } from '@pages/Politicas';
import { Error404 } from '@pages/Error404';
import { ProductoDetalle } from '@pages/ProductoDetalle';
import { Productos } from "@components/Productos/Productos";
import Cart from '@components/Cart/Cart';

// Personalizacion
import '@styles/tokens.css';
import '@styles/index.css';
import '@styles/extends.css';

const App = () => {
    // https://reactrouter.com/start/declarative/routing
	return (
		<Routes>
			<Route>

				<Route element={<Layout hero={true} />}>
					<Route path="/" element={<Inicio />} />
				</Route>

				<Route element={<Layout hero={false} />}>
					<Route path="/alta" element={<Formulario />} />
					<Route path="/carrito" element={<Cart />} />
					<Route path="/destacados" element={<Productos destacados={true} />} />
					<Route path="/politicas" element={<Politicas />} />
					<Route path="/producto/:id" element={<ProductoDetalle />} />
					<Route path="/productos" element={<Productos destacados={false} />} />
	  			</Route>

				<Route path="*" element={<Error404 />} />
  			</Route>
	 	</Routes>
	);
}

export default App;