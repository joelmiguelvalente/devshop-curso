// /src/components/Layout/Navbar.jsx
import { ListaFavoritos } from '@ui/ListaFavoritos';

function Navbar({ brand, brandShort }) {
    const menu = [
        { active: true, href: "#inicio", label: "Inicio" },
        { active: false, href: "#productos", label: "Productos" },
        { active: false, href: "#contacto", label: "Contacto" },
        { active: false, href: "#carrito", label: "Carrito", total: 0 }
    ];

    return (
        <nav className="navbar fixed w-full z-2 py-3" aria-label="Navegación principal">
            <div className="container flex justify-between items-center">
                <div className="brand">
                    <a href="/" className="brand-text flex justify-start items-center gap-2 font-bold text-lg">
                        <span className="flex justify-center items-center bg-brand text-brand-foreground rounded text-sm font-bold">{brandShort}</span>
                        {brand}
                    </a>
                </div>

                <div className="menu flex justify-end items-center gap-3">
                    {menu.map((item, id) => {
                        const { active, href, label, total } = item;
                        return (
                            <a key={id}
                                className={`menu-link font-bold${active ? ' active text-brand' : ''}`}
                                href={href}
                                aria-label={label}
                                alt={`Ir a ${label}`}
                            >
                                {label} {total >= 0 && (<>({total})</>)}
                            </a>
                        )
                    })}
                    <ListaFavoritos />
                </div>
            </div>
        </nav>
    )
}
export default Navbar;