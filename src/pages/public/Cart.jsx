// src/pages/public/Cart.jsx
import { useState } from 'react';
// Componentes
import { Badge } from '@ui/Badge';
import { Button } from '@ui/Button';
import { Empty } from '@blocks/Empty';
import { Table, THead, THeadItem, TBody, TRow, TData } from '@ui/Table';
// Utilidades
import { obtenerPrecio, obtenerSubtotal } from '@utils/CompactNumber';
import { validateCoupon, checkCoupon, calcDiscount } from '@utils/Coupon';
// Hook
import { useCart } from '@hooks/useCart';

export function Cart() {

    // Obtenemos el contexto de los productos
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
    const subtotal = getCartTotal();
    const cantidad = getCartQuantity();

    // Cupón en estado local: solo el carrito lo usa
    const [applying, setApplying] = useState(false);
    const [code, setCode] = useState('');
    const [coupon, setCoupon] = useState(null);
    const [couponError, setCouponError] = useState('');

    if (productos.length === 0) {
        return <Empty heading="El carrito está vacío" content="Agrega productos para continuar la compra." />;
    }

    const applyCoupon = async () => {
        setApplying(true);
        const res = await validateCoupon(code, subtotal);
        setApplying(false);
        if (res.ok) {
            setCoupon(res.coupon);
            setCouponError('');
            setCode('');
        } else {
            setCoupon(null);
            setCouponError(res.message);
        }
    };

    // Revalidación local (sin red) ante cada cambio del carrito: si deja de
    // cumplir (ej. mínimo), el descuento vale 0 hasta quitarlo o recuperarlo
    const check = checkCoupon(coupon, subtotal);
    const discount = check.ok ? calcDiscount(coupon, subtotal) : 0;
    const total = subtotal - discount;
    const savePct = subtotal > 0 ? Math.round((discount / subtotal) * 100) : 0;

    return (
        <div className="pt-5">
            <h1 className="text-4xl my-3">Carrito de Compras</h1>
            <p className="block py-1 text-center">Hay <strong>{cantidad} producto{cantidad > 1 ? 's' : ''}</strong> en tu carrito!</p>
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
                                <TData label="Nombre">
                                    <div className="lg:text-left md:text-right">
                                        {title}
                                        <br />
                                        {discount > 0 && (
                                            <Badge variant="success">
                                                ¡{discount}% OFF incluido!
                                            </Badge>
                                        )}
                                    </div>
                                </TData>
                                <TData label="Cantidad">
                                    <div className="flex justify-center items-center border overflow-hidden mx-auto my-0 rounded cart-action">
                                        <button className="py-3 px-2 text-center w-40 rounded-0" onClick={() => decreaseQuantity(id)}>−</button>
                                        <input
                                            type="number"
                                            value={quantity}
                                            min="0"
                                            className="w-80 py-3 px-2 text-center border text-center rounded-0"
                                            onChange={(e) => updateQuantity(id, parseInt(e.target.value) || 0)}
                                        />
                                        <button className="py-3 px-2 text-center w-40 rounded-0" onClick={() => addToCart(item, 1)}>+</button>
                                    </div>
                                </TData>
                                <TData cx="precio font-bold text-right" value={unitario} label="Precio unitario" />
                                <TData cx="precio font-bold text-right" value={subtotal} label="Subtotal" />
                                <TData className="text-center" label="Acción">
                                    <Button variant="ghost" onClick={() => removeFromCart(id)}>Quitar</Button>
                                </TData>
                            </TRow>
                        )}
                    )}
                </TBody>
            </Table>
            <div className="grid gap-3 md:grid-cols-2 mt-4">
                <div className="bg-surface border border-color rounded-lg p-4">
                    <h3 className="text-base font-bold mb-3">¿Tenés un cupón?</h3>
                    {coupon && check.ok ? (
                        <div className="flex items-center justify-between gap-2">
                            <div>
                                <Badge variant="success">{coupon.code}</Badge>
                                <p className="text-sm text-muted mt-2">{coupon.title}</p>
                            </div>
                            <Button variant="ghost" onClick={() => { setCoupon(null); setCouponError(''); }}>Quitar</Button>
                        </div>
                    ) : (
                        <div className="flex gap-2">
                            <input
                                className="p-2 border border-color rounded-2 w-full text-base focus-ring"
                                placeholder="Ej. DESCUENTO20"
                                value={code}
                                disabled={applying}
                                onChange={(e) => setCode(e.target.value)}
                                onKeyDown={(e) => { if (e.key === 'Enter') applyCoupon(); }}
                            />
                            <Button onClick={applyCoupon} disabled={applying || code.trim() === ''}>
                                {applying ? 'Validando...' : 'Aplicar'}
                            </Button>
                        </div>
                    )}
                    {couponError && <p className="text-error text-sm font-medium mt-2">{couponError}</p>}
                    {coupon && !check.ok && <p className="text-warning text-sm font-medium mt-2">{check.message}</p>}
                </div>
                <div className="bg-surface border border-color rounded-lg p-4 flex flex-col gap-2">
                    <div className="flex justify-between items-center">
                        <span className="text-muted">Subtotal</span>
                        <span className="font-bold">{obtenerPrecio(subtotal)}</span>
                    </div>
                    {discount > 0 && (
                        <div className="flex justify-between items-center">
                            <span className="text-success font-medium">
                                Cupón {coupon.code} (−{coupon.discountType === 'percentage' ? `${coupon.discountValue}%` : 'monto fijo'})
                            </span>
                            <span className="text-success font-bold">−{obtenerPrecio(discount)}</span>
                        </div>
                    )}
                    <div className="flex justify-between items-center border-t border-color pt-2">
                        <span className="text-lg font-bold">Total a pagar</span>
                        <span className="text-lg font-black">{obtenerPrecio(total)}</span>
                    </div>
                    {discount > 0 && (
                        <p className="text-sm text-success font-semibold text-right">
                            Estás ahorrando {obtenerPrecio(discount)} ({savePct}%)
                        </p>
                    )}
                </div>
            </div>
            <div className="flex justify-center items-center gap-3 mt-3">
                <Button variant="ghost" onClick={clearCart}>Vaciar Carrito</Button>
                <Button>Finalizar compra</Button>
            </div>
        </div>
    );

};