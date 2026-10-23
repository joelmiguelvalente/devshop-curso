// src/layout/global/Footer.jsx
import { Informacion } from '@layout/global/Informacion';
import { NavFooter } from '@layout/global/NavFooter';
import { Newsletter } from '@layout/global/Newsletter';
import { Nosotros } from '@layout/global/Nosotros';

const FullFooter = () => {
	return (
		<>
			<Nosotros />
			<div className="container py-8 grid gap-6 lg:grid-cols-3 md:grid-cols-3 sm:grid-cols-2">
				<NavFooter />
				<Informacion />
				<Newsletter />
			</div>
		</>
	);
}

const TemplateFooter = ({ brand, full, children }) => {
	const currentYear = new Date().getFullYear();
	return (
		<footer className="mt-6 border-t border-1 border-color bg-surface">
			{full && <FullFooter />}
			{children}
			<div className="border-t border-1 border-color">
				<p className="container text-center py-3 text-sm text-muted">
					<strong className="font-bold">{brand}</strong> &copy; {currentYear}. Todos los derechos reservados.
				</p>
			</div>
		</footer>
	)
}

export const Footer = ({
	brand = "DevShop", isFull
}) => {
	return (
		<TemplateFooter brand={brand} full={isFull} />
	);
}