// /src/components/ui/ListaFavoritos.jsx
import { Link } from 'react-router';
import { Heart, ShoppingCart } from 'lucide-react';
import { useCart } from '@hooks/useCart';
import { useFavoritoNavbar } from '@hooks/useFavorito';

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

export function UsuarioWrap() {
    const { favoritosContar } = useFavoritoNavbar();
    const { getCartQuantity } = useCart();
    const totalItems = getCartQuantity();

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
        </div>
    )
}