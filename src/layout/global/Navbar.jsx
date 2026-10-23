// /src/layout/global/Navbar.jsx
import { useState } from 'react';
import { NavLink } from 'react-router';
import { Menu, X } from 'lucide-react';
import { UsuarioWrap } from '@layout/global/Usuario';
import { Logo } from '@ui/Logo';
import { useAuth } from '@hooks/useAuth';

function Navbar() {

	const [menu, toggleMenu] = useState(false);
	const toggle = () => toggleMenu(!menu);
	const { user } = useAuth();

	// Si la clase esta activa, solo funciona con NavLink
	const addClass = 'menu-link hover:text-brand text font-bold';
	const linkClass = ({ isActive }) => `${addClass}${isActive ? " active:text-brand" : ""}`;

	const isMember = !!user;
	let isAdmin = user?.rol === 'admin';

	return (
		<nav className="navbar bg-background fixed w-full z-2 py-2 px-3" aria-label="Navegación principal">
			<div className={`flex justify-${isMember ? 'start' : 'between'} items-center gap-3`}>
				<div className="brand flex gap-2">
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
				<>
					<div className="flex justify-start items-center gap-3 grow-1">
						<div
							id="main-menu"
							className={`menu fixed md:relative flex justify-start md:justify-center items-start md:items-center flex-col md:flex-row gap-4${menu ? ' open' : ''}`}
						>
							<NavLink className={linkClass} to="/" end>Inicio</NavLink>
							<NavLink className={linkClass} to="/productos">Productos</NavLink>
							<NavLink className={linkClass} to="/destacados">Destacados</NavLink>
							{isAdmin && <NavLink className={linkClass} to="/admin">Administracion</NavLink>}
						</div>
					</div>
					<UsuarioWrap />
				</>
			</div>
		</nav>
	)
}

export default Navbar;