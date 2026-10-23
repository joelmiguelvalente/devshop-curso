// /src/layout/global/NavFooter.jsx
import { Link } from 'react-router';

export function NavFooter() {
    return (
        <nav className="flex flex-col gap-2" aria-label="Navegación secundaria">
            <p className="font-bold text-md">Explorá</p>
            <Link className="text text-muted hover:underline" to="/">Inicio</Link>
            <Link className="text text-muted hover:underline" to="/productos">Productos</Link>
            <Link className="text text-muted hover:underline" to="/destacados">Destacados</Link>
            <Link className="text text-muted hover:underline" to="/admin/productos/agregar">Alta</Link>
        </nav>
    )
}