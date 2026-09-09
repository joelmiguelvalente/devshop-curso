// /src/components/Layout/Layout.jsx
import { Title, Configuracion } from "@components/Configuracion";
import { Productos } from "@components/Productos/Productos";
import { Nosotros } from "@components/Nosotros";
import { FormularioContainer as Formulario } from "@components/Formulario/FormularioContainer";
// Secciones
import Header from '@layout/Header';
import Footer from '@layout/Footer';

export function Layout() {
	const { short, heading, subheading } = Configuracion;
	const secciones = Object.values(Configuracion.sections);
	const headerProps = { short, heading, subheading };
	return (
		<>
			<Header {...headerProps} />
			<main className="container my-3">
                {secciones.map((section, idx) => <Productos key={idx} {...section} />)}
                <Nosotros />
                <Formulario />
            </main>
			<Footer brand={Title} />
		</>
	);
}