// /src/layout/global/Usuario.jsx
// Librerias
import { Link, useNavigate } from 'react-router';
import { Heart, ShoppingCart } from 'lucide-react';
// Constante
import { COLECCION } from '@constants/collections';
// Componentes
import { Image } from '@ui/Image';
// Hooks
import { useAuth } from '@hooks/useAuth';
import { useCart } from '@hooks/useCart';
import { useFavoritoNavbar } from '@hooks/useFavorito';
import { useFirestoreDoc } from '@hooks/useFirestore';

const ContadorBadge = ({ total = 0, srOnly = 'Vacio' }) => {
	if(total === 0) {
		return;
	}
	return (
		<>
			<span className="sr-only">({srOnly})</span>
			<small className="absolute font-black" style={{ top: '-8px', right: '-3px' }} aria-hidden="true">{total}</small>
		</>
	)
}

const linkClass = {
	default: "px-1 relative text-brand flex justify-center items-center",
	variant: "text-$1 font-black",
	dropitem: "py-1 font-bold relative text-brand"
}

const LinkOne = ({ type = 'default', variant = 'ghost', label, path, page, children }) => {
	const ref = (type === 'auth') ? `/auth/${page}` : path;
	// 'auth' se estila con la plantilla de variante (como el LinkOut original: text-{variant} font-black)
	const plantilla = (type === 'auth') ? linkClass.variant : linkClass[type];
	const cx = plantilla?.replace('$1', variant);
	return (
		<Link to={ref} className={cx}>{children ?? label}</Link>
	)
}

const DropDown = ({ user, data, logout }) => {
	const navigate = useNavigate();
	const handleLogout = async () => {
		try {
			await logout();
			navigate("/", { replace: true });
		} catch (error) {
			console.error("Error al cerrar sesión:", error);
		}
	};
	if(!user) {
		return;
	}
	return (
		<div className="relative ml-3">
			<button popoverTarget="dropdown_panel_user" className="flex justify-center items-center gap-2 text-brand font-bold flex-row-reverse w-full" aria-label={data?.name ?? 'Menú de usuario'} style={{
				anchorName: '--mi-boton-anclaje'
			}}>
				<Image type="avatar" image={data?.avatar} cx="w-32 h-32 rounded-full" />
				<span className="user-name">{data?.name}</span>
			</button>

			<div id="dropdown_panel_user" popover="auto" className="bg-background border-t border-3 border-brand shadow-sm p-2 flex flex-col w-200" style={{
				positionAnchor: '--mi-boton-anclaje'
			}}>
				<LinkOne type="dropitem" path="/perfil" label="Mi Perfil" />
				<LinkOne type="dropitem" path="/perfil#cupones" label="Mis cupones" />
				<LinkOne type="dropitem" path="/perfil#compras" label="Mis compras" />
				<LinkOne type="dropitem" path="/favoritos" label="Mis favoritos" />
				<span onClick={handleLogout} className="py-1 font-bold relative text-brand" style={{ cursor: 'pointer' }}>
					Cerrar Sesion
				</span>
			</div>
		</div>
	);
}

const UserActive = ({
	values
}) => {
	const { favoritosContar } = useFavoritoNavbar();
	const { getCartQuantity } = useCart();
	const totalItems = getCartQuantity();
	return (
		<div className="flex justify-center items-center gap-3">
			<LinkOne path="/carrito">
				<ShoppingCart className="fill-brand" aria-hidden="true" />
				<ContadorBadge total={totalItems} srOnly={`${totalItems} artículos`} />
			</LinkOne>
			<LinkOne path="/favoritos">
				<Heart className="fill-brand" aria-hidden="true" />
				<ContadorBadge total={favoritosContar} srOnly={`${favoritosContar} favoritos`} limitar={true} />
			</LinkOne>
			<DropDown {...values} />
		</div>
	)
}

export function UsuarioWrap() {
	const { user, logout } = useAuth();
	const { data } = useFirestoreDoc(COLECCION.usuarios, user?.uid)

	// crear constante para saber si es administrador o no
	const isMember = !!user;

	return (
		<div className="navbar-actions flex justify-center items-center gap-3 lg:order-2">
			{isMember ? <UserActive values={{ user, data, logout }} /> : (
				<>
					<LinkOne type="auth" page="register" variant="brand" label="Crear cuenta" />
					<LinkOne type="auth" page="login" variant="success">
						<span className="none md:inline-block">Iniciar sesión</span>
						<span className="md:none">Entrar</span>
					</LinkOne>
				</>
			)}
		</div>
	);
}