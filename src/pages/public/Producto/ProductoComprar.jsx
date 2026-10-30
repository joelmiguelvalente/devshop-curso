// src/pages/public/Producto/ProductoComprar.jsx
import { useState } from 'react';
// Libreria
import { Heart, HeartMinus, ShoppingCartPlus, Trash2 } from 'lucide-react';
// Componentes
import { Alerta } from '@ui/Alerta';
import { ButtonGroup, Button } from '@ui/Button';
// Hooks
import { useCart } from '@hooks/useCart';
import { useFavorito } from '@hooks/useFavorito';

export function Comprar({ id, title, price, stock = 0, discount = 0 }) {
    const nombreProducto = title ?? 'Producto';

    const [favorito, setFavorito] = useFavorito(id, nombreProducto);
    const [alerta, setAlerta] = useState({ tipo: '', mensaje: '' });
    const { cart, addToCart, removeFromCart } = useCart();

    const sinStock = (stock <= 0);
    const enCarrito = cart.some(item => item.id === id);

    const handleFavorito = () => {
        const prefijo = favorito ? 'Quitaste' : 'Agregaste';
        setFavorito();
        setAlerta({
            tipo: (!favorito ? 'success' : 'info'),
            mensaje: `${prefijo} ${nombreProducto} de favoritos.`
        });
    };

    const handleAddToCart = () => {
        if (sinStock) {
            setAlerta({
                tipo: 'warning',
                mensaje: `${nombreProducto} no tiene stock disponible.`
            });
            return;
        }
        addToCart({ id, title: nombreProducto, price: price ?? 0, discount: discount ?? 0 }, 1);
        setAlerta({
            tipo: 'success',
            mensaje: `Agregaste ${nombreProducto} al carrito.`
        });
    };

    const handleRemoveFromCart = () => {
        removeFromCart(id);
        setAlerta({
            tipo: 'info',
            mensaje: `Quitaste ${nombreProducto} del carrito.`
        });
    };

    const textoFavorito = `${favorito ? 'Quitar de' : 'Añadir a'} favoritos`;

    return (
        <>
            {alerta.mensaje && (
                <Alerta
                    type={alerta.tipo}
                    message={alerta.mensaje}
                    onClose={() => setAlerta({ tipo: '', mensaje: '' })}
                />
            )}
            <ButtonGroup fullWidth>
                {enCarrito ? (
                    <Button variant="ghost" onClick={handleRemoveFromCart} fullWidth>
                        <Trash2 aria-hidden="true" /> Quitar del carrito
                    </Button>
                ) : (
                    <Button onClick={handleAddToCart} disabled={sinStock} fullWidth>
                        <ShoppingCartPlus aria-hidden="true" /> Añadir al carrito
                    </Button>
                )}
                <Button isOnlyIcon aria-label={textoFavorito} onClick={handleFavorito}>
                    {favorito ? <HeartMinus aria-hidden="true" /> : <Heart aria-hidden="true" />}
                </Button>
            </ButtonGroup>
        </>
    );
}