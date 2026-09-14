// src/layout/parts/Footer.jsx
import { Link } from "react-router";

const Footer = ({ brand = "DevShop" }) => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="mt-6 border-t border-1 border-color bg-surface">
            <div className="container py-6 grid gap-4 md:grid-cols-3">
                <div className="flex flex-col gap-2">
                    <p className="font-bold text-lg">{brand}</p>
                    <p className="text-sm text-muted">Tienda demo del curso de React. Catálogo, destacados y detalle de producto.</p>
                </div>

                <nav className="flex flex-col gap-2" aria-label="Navegación secundaria">
                    <p className="font-bold text-sm">Explorá</p>
                    <Link className="text-sm" to="/">Inicio</Link>
                    <Link className="text-sm" to="/productos">Productos</Link>
                    <Link className="text-sm" to="/destacados">Destacados</Link>
                    <Link className="text-sm" to="/alta">Alta</Link>
                </nav>

                <div className="flex flex-col gap-2">
                    <p className="font-bold text-sm">Ayuda</p>
                    <p className="text-sm text-muted">Proyecto con fines educativos. Los datos y precios son de ejemplo.</p>
                </div>
            </div>

            <div className="border-t border-1 border-color">
                <p className="container text-center py-3 text-sm text-muted">
                    <strong className="font-bold">{brand}</strong> &copy; {currentYear}. Todos los derechos reservados.
                </p>
            </div>
        </footer>
    );
};

export default Footer;
