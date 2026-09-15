// /src/App.jsx
// Enrutacion
import { Routes, Route } from "react-router";

// Layout, componentes y configuraciones
import Layout from '@layout/Layout';
import { FormularioContainer as Formulario } from "@components/Formulario/FormularioContainer";
import { Home } from '@pages/Home';
import { ProductoDetalle } from '@pages/ProductoDetalle';
import { Productos } from "@components/Productos/Productos";
import Cart from '@components/Cart/Cart';

// Personalizacion
import './tokens.css';
import './index.css';

const App = () => {
    // https://reactrouter.com/start/declarative/routing
	return (
		<Routes>
			<Route element={<Layout hero={true} />}>
				<Route path="/" element={<Home />} />
				<Route path="/alta" element={<Formulario />} />
			</Route>

			<Route element={<Layout hero={false} />}>
				<Route path="/productos" element={<Productos destacados={false} />} />
				<Route path="/destacados" element={<Productos destacados={true} />} />
				<Route path="/producto/:id" element={<ProductoDetalle />} />
				<Route path="/carrito" element={<Cart />} />
  			</Route>
	 	</Routes>
	);
}

export default App;