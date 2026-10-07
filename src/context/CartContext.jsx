import { useState, useEffect } from 'react';
import { CartContext } from '@hooks/useCart';
import { obtener, guardar } from '@utils/Storage';

export const CartProvider = ({ children }) => {
    // Lo hago persistente, se guarda en localstorage
    const [cart, setCart] = useState(() => obtener('carrito'));

    // Cada vez que el carrito cambie, guarda la copia actualizada
    useEffect(() => guardar('carrito', cart), [cart]);

    // Agregamos item al carrito
    const addToCart = (product, quantity) => {
        // Product: id, title, price y discount
        setCart(prevCart => {
            const itemInCart = prevCart.find(item => item.id === product.id);
            if (itemInCart) {
                return prevCart.map(item => {
                    return (item.id === product.id) ? { ...item, quantity: item.quantity + quantity } : item
                });
            }
            return [...prevCart, { ...product, quantity }];
        });
    };

    // Limpiar carrito
    const clearCart = () => setCart([]);

    // Cantidad de productos en el carrito
    const getCartQuantity = () => cart.reduce((acc, item) => acc + item.quantity, 0);

    // Obtener el total a pagar!
    const getCartTotal = () => cart.reduce((acc, item) => {
        // Si tiene descuento, restamos ese porcentaje al precio unitario
        const discount = item.discount ? item.price * (1 - item.discount / 100) : item.price;
        return acc + (discount * item.quantity);
    }, 0);

    // Removemos producto del carrito
    const removeFromCart = (id) => setCart(prev => prev.filter(item => item.id !== id));

    // Descontamos producto determinado
    const decreaseQuantity = (id) => setCart(
        prev => prev.map(item => item.id === id ? { ...item, quantity: item.quantity - 1 } : item)
        .filter(item => item.quantity > 0)
    );

    // Actualizamos cantidad
    const updateQuantity = (id, newQuantity) => {
        if (newQuantity <= 0) {
            setCart(prev => prev.filter(item => item.id !== id));
            return;
        }
        setCart(prev => prev.map(item =>
            item.id === id ? { ...item, quantity: newQuantity } : item
        ));
    };

    const values = {
        addToCart,
        cart,
        clearCart,
        decreaseQuantity,
        getCartQuantity,
        getCartTotal,
        removeFromCart,
        updateQuantity
    }

    return (
        <CartContext.Provider value={values} >
            {children}
        </CartContext.Provider>
    );

}