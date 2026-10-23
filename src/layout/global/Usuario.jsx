// /src/layout/global/Usuario.jsx
import { Link, useNavigate } from 'react-router';
import { Heart, ShoppingCart } from 'lucide-react';
import { COLECCION } from '@constants/collections';
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

const Linked = ({ path, children }) => <Link to={path} className="px-1 relative text-brand flex justify-center items-center">{children}</Link>;

const LinkOut = ({ path, variant, children }) => <Link to={path} className={`text-${variant} font-black`}>{children}</Link>;

const DropItem = ({ path, label, children }) => {
	return <Link to={path} className="py-1 font-bold relative text-brand">{children ?? label}</Link>
}

export function UsuarioWrap() {

    const { user, logout } = useAuth();

    const { data } = useFirestoreDoc(COLECCION.usuarios, user?.uid)

    const navigate = useNavigate();
	const { favoritosContar } = useFavoritoNavbar();
	// Del contexto del carrito
	const { getCartQuantity } = useCart();
	const totalItems = getCartQuantity();

	const handleLogout = async () => {
    	try {
      		await logout();
      		navigate("/", { replace: true });
    	} catch (error) {
      		console.error("Error al cerrar sesión:", error);
    	}
  	};

  	// crear constante para saber si es administrador o no
	const isMember = !!user;

	let panel = '';
	if(user) {
		panel = (
			<div className="relative">
				<button popoverTarget="dropdown_panel_user" className="flex justify-center items-center gap-2 text-brand font-bold flex-row-reverse" style={{
                    anchorName: '--mi-boton-anclaje'
                }}>
					<img src={data?.avatar} className="w-32 h-32 rounded-full" />
					{data?.name}
				</button>

				<div id="dropdown_panel_user" popover="auto" className="bg-background border-t border-3 border-brand shadow-sm p-2 flex flex-col w-280" style={{
                    positionAnchor: '--mi-boton-anclaje'
                }}>
					<DropItem path="/perfil">Mi Perfil</DropItem>
					<DropItem path="/#cupones">Mis cupones</DropItem>
					<DropItem path="/#compras">Mis compras</DropItem>
					<DropItem path="/favoritos">Mis favoritos</DropItem>
					<span onClick={handleLogout} className="py-1 font-bold relative text-brand" style={{ cursor: 'pointer' }}>
						Cerrar Sesion
					</span>
				</div>
			</div>
		);
	}

	if(isMember) {
		return (
			<div className="flex justify-center items-center gap-2">
				<Linked path="/carrito">
					<ShoppingCart className="fill-brand" aria-hidden="true" />
					<ContadorBadge total={totalItems} srOnly={`${totalItems} artículos`} />
				</Linked>
				<Linked path="/favoritos">
					<Heart className="fill-brand" aria-hidden="true" />
					<ContadorBadge total={favoritosContar} srOnly={`${favoritosContar} favoritos`} limitar={true} />
				</Linked>
				{panel}
			</div>
		)
	}

	return (
		<div className="flex justify-center items-center gap-4">
			<LinkOut path="/auth/register" variant="brand">
				Crear cuenta
			</LinkOut>
			<LinkOut path="/auth/login" variant="success">
				Iniciar sesión
			</LinkOut>
		</div>
	)
}