// /src/layout/global/Navbar.jsx
import { useState } from 'react';
// Librerias
import { NavLink } from 'react-router';
import { Menu, X, Search } from 'lucide-react';
// Constante
import { ADMINISTRADOR } from '@constants/collections';
// Componente
import { Logo } from '@ui/Logo';
import { InstantSearch } from '@ui/InstantSearch';
// Hook
import { useAuth } from '@hooks/useAuth';
// Otro
import { UsuarioWrap } from '@layout/global/Usuario';

function Navbar() {

	const [menu, toggleMenu] = useState(false);
	const [search, toggleSearch] = useState(false);

	// Menu y buscador nunca a la vez: en pantallas chicas se pisarian
	// (el panel del buscador cae justo debajo del navbar).
	const toggle = () => {
		toggleMenu(!menu);
		toggleSearch(false);
	};
	const toggleBuscador = () => {
		toggleSearch(!search);
		toggleMenu(false);
	};
	const cerrarBuscador = () => toggleSearch(false);

	const { user, rol } = useAuth();

	// Si la clase esta activa, solo funciona con NavLink
	const addClass = 'menu-link hover:text-brand text font-bold';
	const linkClass = ({ isActive }) => `${addClass}${isActive ? " active:text-brand" : ""}`;

	const isMember = !!user;
	let isAdmin = rol === ADMINISTRADOR;

	return (
		<nav className="navbar bg-background fixed w-full z-2 py-2 px-3 top-0 mt-0" aria-label="Navegación principal">
			{/* flex-wrap: hasta lg el buscador baja a su propia fila en vez de desbordar */}
			<div className={`flex flex-wrap justify-${isMember ? 'start' : 'between'} items-center gap-3`}>
				<div className="brand flex gap-2">
					<button
						type="button"
						onClick={toggle}
						className="toggleMenu flex justify-center items-center md:none w-24 h-24 bg-transparent text focus-ring"
						aria-label={menu ? "Cerrar menú de navegación" : "Abrir menú de navegación"}
						aria-expanded={menu}
						aria-controls="main-menu"
					>
						{menu ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
					</button>
					<Logo />
				</div>
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
				{/* Solo hasta lg: un ícono abre el buscador a lo ancho (fila siguiente) */}
				<button
					type="button"
					onClick={toggleBuscador}
					className="nav-search-toggle flex justify-center items-center lg:none w-24 h-24 bg-transparent focus-ring"
					aria-label={search ? "Cerrar buscador" : "Buscar productos"}
					aria-expanded={search}
					aria-controls="navbar-search"
				>
					{search
						? <X className="fill-brand" size={18} aria-hidden="true" />
						: <Search className="fill-brand" size={18} aria-hidden="true" />}
				</button>
				<UsuarioWrap />
				{/* order-1: hasta lg queda al final de la fila y baja a su propia línea;
				    desde lg vuelve a quedar junto a los accesos (una sola línea).
				    lg:flex: siempre visible desde lg, antes se abre con el ícono. */}
				<div
					id="navbar-search"
					className={`navbar-search order-1 w-full lg:w-auto items-center${search ? ' flex' : ' none'} lg:flex`}
				>
					<InstantSearch open={search} onClose={cerrarBuscador} />
				</div>
			</div>
		</nav>
	)
}

export default Navbar;
