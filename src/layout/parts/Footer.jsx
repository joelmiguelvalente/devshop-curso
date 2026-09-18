// src/layout/parts/Footer.jsx
import { Link } from "react-router";
import { Nosotros } from "@components/Nosotros";

const Footer = ({ brand = "DevShop" }) => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="mt-6 border-t border-1 border-color bg-surface">
            <Nosotros />

            <div className="container py-8 grid gap-6 md:grid-cols-4">
                <div className="flex flex-col gap-2">
                    <p className="font-bold text-lg">{brand}</p>
                    <p className="text-sm text-muted">Tienda demo del curso de React. Catálogo, destacados y detalle de producto.</p>
                </div>

                <nav className="flex flex-col gap-2" aria-label="Navegación secundaria">
                    <p className="font-bold text-sm">Explorá</p>
                    <Link className="text-sm hover:underline" to="/">Inicio</Link>
                    <Link className="text-sm hover:underline" to="/productos">Productos</Link>
                    <Link className="text-sm hover:underline" to="/destacados">Destacados</Link>
                    <Link className="text-sm hover:underline" to="/alta">Alta</Link>
                </nav>

                <div className="flex flex-col gap-2">
                    <p className="font-bold text-sm">Empresa</p>
                    <Link className="text-sm hover:underline" to="/politicas">Políticas de Privacidad</Link>
                    <div className="text-sm text-muted flex flex-col gap-1 mt-1">
                        <span className="font-semibold text-foreground text-xs">Contacto:</span>
                        <span>soporte@devshop.com</span>
                    </div>
                    <div className="text-sm text-muted flex flex-col gap-1 mt-1">
                        <span className="font-semibold text-foreground text-xs">Sucursales / Sedes:</span>
                        <span>Sede Central: Av. Siempre viva 1234, CABA</span>
                    </div>
                </div>

                <div className="flex flex-col gap-2">
                    <p className="font-bold text-sm">Newsletter</p>
                    <p className="text-xs text-muted">Suscribite para recibir las últimas novedades y ofertas.</p>
                    <form onSubmit={(e) => e.preventDefault()} className="flex gap-2 mt-1">
                        <input
                            type="email"
                            placeholder="Tu email"
                            className="w-full p-2 text-sm border border-color rounded-2"
                            required
                        />
                        <button
                            type="submit"
                            className="px-3 py-1.5 text-sm bg-primary text-primary-foreground font-medium rounded hover:opacity-90 transition-opacity"
                        >
                            Unirse
                        </button>
                    </form>
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
