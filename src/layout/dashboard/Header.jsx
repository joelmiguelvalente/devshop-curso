// src/layout/dashboard/Header.jsx
import { useState } from 'react';
import { Link } from "react-router";
import { Menu, X } from 'lucide-react';
import { Logo } from '@ui/Logo';

const Header = () => {

    const [menu, toggleMenu] = useState(false);
    const toggle = () => toggleMenu(!menu);

    return (
        <header className="relative bg-background p-2 flex justify-between items-center">
            <div className="logo brand flex gap-2">
                <div
                    onClick={toggle}
                    className="toggleMenu flex justify-center items-center md:none"
                    aria-label={menu ? "Cerrar menú de navegación" : "Abrir menú de navegación"}
                    aria-expanded={menu}
                    aria-controls="main-menu"
                >
                    {menu ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
                </div>
                <Logo />
            </div>
            <Link to="/" className="text gap-2 font-bold">Regresar al sitio</Link>
        </header>
    )
};

export default Header;