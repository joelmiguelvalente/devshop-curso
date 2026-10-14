// src/pages/public/Cart.jsx
import { useCart } from '@hooks/useCart';
import { obtenerPrecio, obtenerSubtotal } from '@utils/CompactNumber';
import { Badge } from '@ui/Badge';
import { Button } from '@ui/Button';
import { Empty } from '@ui/Empty';
import { Table, THead, THeadItem, TBody, TRow, TData, TFoot } from '@ui/Table';

export function Cart() {

    const {
        addToCart,
        cart: productos,
        clearCart,
        decreaseQuantity,
        getCartTotal,
        getCartQuantity,
        updateQuantity,
        removeFromCart
    } = useCart();

    if (productos.length === 0) {
        return <Empty heading="El carrito está vacío" content="Agrega productos para continuar la compra." />;
    }

    const total = obtenerPrecio(getCartTotal());
    const items = getCartQuantity();

    return (
        <div className="pt-5">
            <h1 className="text-4xl my-3">Carrito de Compras</h1>
            <p className="block py-1 text-center">Hay <strong>{items} producto{items > 1 ? 's' : ''}</strong> en tu carrito!</p>
            <Table>
                <THead>
                    <TRow>
                        <THeadItem>Nombre</THeadItem>
                        <THeadItem>Cantidad</THeadItem>
                        <THeadItem>Precio unitario</THeadItem>
                        <THeadItem>Subtotal</THeadItem>
                        <THeadItem>Acción</THeadItem>
                    </TRow>
                </THead>
                <TBody>
                    {productos.map(item => {
                        const { id, price, quantity, title, discount } = item;

                        const precioEfectivo = discount ? price * (1 - discount / 100) : price;

                        const unitario = obtenerPrecio(precioEfectivo);
                        const subtotal = obtenerSubtotal(precioEfectivo, quantity);
                        return (
                            <TRow key={id}>
                                <TData>
                                    {title}
                                    <br />
                                    {discount > 0 && (
                                        <Badge variant="success">
                                            ¡{discount}% OFF incluido!
                                        </Badge>
                                    )}
                                </TData>
                                <TData>
                                    <div className="flex justify-center items-center cart-action">
                                        <button onClick={() => decreaseQuantity(id)}>−</button>
                                        <input
                                            type="number"
                                            value={quantity}
                                            min="0"
                                            className="w-12 text-center border rounded"
                                            onChange={(e) => updateQuantity(id, parseInt(e.target.value) || 0)}
                                        />
                                        <button onClick={() => addToCart(item, 1)}>+</button>
                                    </div>
                                </TData>
                                <TData cx="precio font-bold text-right" value={unitario} />
                                <TData cx="precio font-bold text-right" value={subtotal} />
                                <TData className="text-center">
                                    <Button variant="ghost" onClick={() => removeFromCart(id)}>Quitar</Button>
                                </TData>
                            </TRow>
                        )}
                    )}
                </TBody>
                <TFoot>
                    <TRow>
                        <TData colSpan="5" cx="text-right">
                            <h3 className="text-lg">Total a pagar: {total}</h3>
                        </TData>
                    </TRow>
                </TFoot>
            </Table>
            <hr />
            <div className="flex justify-center items-center gap-3 mt-3">
                <Button variant="ghost" onClick={clearCart}>Vaciar Carrito</Button>
                <Button>Finalizar compra</Button>
            </div>
        </div>
    );

};