// /src/components/Layout/Navbar.jsx
import { Link, NavLink } from "react-router";
import { ListaFavoritos } from '@ui/ListaFavoritos';

function Navbar({ brand, brandShort, hero }) {
    const linkClass = ({ isActive }) => `menu-link font-bold${isActive ? " text-brand" : ""}`;

    return (
        <nav className={`navbar ${hero ? 'fixed' : 'sticky'} w-full z-2 py-3`} aria-label="Navegación principal">
            <div className="container flex justify-between items-center">
                <div className="brand">
                    <Link to="/" className="brand-text flex justify-start items-center gap-2 font-bold text-lg">
                        <span className="flex justify-center items-center bg-brand text-brand-foreground rounded text-sm font-bold">{brandShort}</span>
                        {brand}
                    </Link>
                </div>

                <div className="flex justify-end items-center gap-3">
                    <nav className="menu flex justify-center items-center gap-3">
                        <NavLink className={linkClass} to="/" end>Inicio</NavLink>
                        <NavLink className={linkClass} to="/productos">Productos</NavLink>
                        <NavLink className={linkClass} to="/destacados">Destacados</NavLink>
                    </nav>
                    <ListaFavoritos />
                </div>
            </div>
        </nav>
    )
}
export default Navbar;