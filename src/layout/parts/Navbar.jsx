// /src/components/Layout/Navbar.jsx
import { useState } from 'react';
import { Link, NavLink } from "react-router";
import { Menu, X, ShoppingCart } from 'lucide-react';
import { useCart } from '@hooks/useCart';
import { ListaFavoritos } from '@ui/ListaFavoritos';

function Navbar({ brand, brandShort, hero }) {
    const linkClass = ({ isActive }) => `menu-link hover:text-brand text font-bold${isActive ? " active:text-brand" : ""}`;

    const lastLink = ({ isActive }) => `menu-link hover:text-brand text font-bold flex justify-start items-center gap-1${isActive ? " active:text-brand" : ""}`;

    const [menu, toggleMenu] = useState(false);
    const toggle = () => toggleMenu(!menu);

    const { getCartQuantity } = useCart();
    const totalItems = getCartQuantity();

    return (
        <nav className={`navbar bg-background mt-0 top-0 ${hero ? 'fixed' : 'sticky'} w-full z-2 py-3`} aria-label="Navegación principal">
            <div className="xxl:container xl:container lg:container md:container flex justify-between items-center">
                <div className="brand flex gap-2">
                    <div onClick={toggle} className="toggleMenu flex justify-center items-center md:none" aria-label="Abrir/Cerrar menú">
                        {menu ? <X /> : <Menu />}
                    </div>
                    <Link to="/" className="brand-text text flex justify-start items-center gap-2 font-bold text-lg">
                        <span className="flex justify-center items-center bg-brand text-brand-foreground rounded text-sm font-bold">{brandShort}</span>
                        {brand}
                    </Link>
                </div>

                <div className="flex justify-end items-center gap-3">
                    <nav className={`menu fixed md:relative flex justify-start md:justify-center items-start md:items-center flex-col md:flex-row gap-4${menu ? ' open' : ''}`}>
                        <NavLink className={linkClass} to="/" end>Inicio</NavLink>
                        <NavLink className={linkClass} to="/productos">Productos</NavLink>
                        <NavLink className={linkClass} to="/destacados">Destacados</NavLink>
                        <NavLink className={lastLink} to="/carrito">
                            <ShoppingCart /> Carrito {totalItems > 0 && <span>{totalItems}</span>}
                        </NavLink>
                    </nav>
                    <ListaFavoritos />
                </div>
            </div>
        </nav>
    )
}
export default Navbar;