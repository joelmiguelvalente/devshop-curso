// src/layout/global/Footer.jsx
import { Nosotros } from "@layout/global/Nosotros";
import { NavFooter } from "@layout/global/NavFooter";
import { Informacion } from "@layout/global/Informacion";
import { Newsletter } from "@layout/global/Newsletter";

const FullFooter = () => {
    return (
        <>
            <Nosotros />
            <div className="container py-8 grid gap-6 lg:grid-cols-3 md:grid-cols-3 sm:grid-cols-2">
                {/*<div className="flex flex-col gap-2">
                    <p className="font-bold text-lg">{brand}</p>
                    <p className="text-muted">Tienda demo del curso de React. Catálogo, destacados y detalle de producto.</p>
                </div>*/}
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