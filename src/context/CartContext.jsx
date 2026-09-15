import { useState } from 'react';
import { CartContext } from '@hooks/useCart';

export const CartProvider = ({ children }) => {

    const [cart, setCart] = useState([]);

    const addToCart = (product, quantity) => {
        const itemInCart = cart.find(item => item.id === product.id);
        if (itemInCart) {
            const updatedCart = cart.map(item => item.id === product.id ? { ...item, quantity: item.quantity + quantity } : item);
            setCart(updatedCart);
        } else {
            setCart(prevCart => [...prevCart, { ...product, quantity }]);
        }
    };

    const clearCart = () => setCart([]);
    const getCartQuantity = () => cart.reduce((acumulador, item) => acumulador + item.quantity, 0);
    const getCartTotal = () => cart.reduce((acumulador, item) => acumulador + item.price * item.quantity, 0);

    const removeFromCart = (id) => setCart(prev => prev.filter(item => item.id !== id));
    const decreaseQuantity = (id) => setCart(
        prev => prev.map(item => item.id === id ? { ...item, quantity: item.quantity - 1 } : item)
        .filter(item => item.quantity > 0)
    );


    return (
        <CartContext.Provider value={{ cart, addToCart, clearCart, getCartQuantity, getCartTotal, removeFromCart, decreaseQuantity }}>
            {children}
        </CartContext.Provider>
    );

}