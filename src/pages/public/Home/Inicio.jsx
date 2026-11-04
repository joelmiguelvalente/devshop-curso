// src/pages/public/Home/Inicio.jsx
// Constante
import { Title, Configuracion } from '@constants/configuration';
// Componente
import { Section } from '@ui/Section';
import { SEO } from '@components/seo/SEO';
// Seccion
import { Productos } from '@pages/public/Home/Productos';

export const Inicio = () => {
	const secciones = Configuracion.sections;
	return (
		<>
	      	<SEO
	        	title={`${Title} | Inicio`}
	        	description={`Encuentra los mejores productos tecnológicos y herramientas para desarrolladores en ${Title}.`}
	        	canonical="/"
	        	preload="/images/hero.webp"
	      	/>
			<Section {...secciones.destacados} />
			<Productos destacados={true} limite={4} />
			<br />
			<Section {...secciones.productos} />
			<Productos destacados={false} limite={8} />
		</>
	)
}