// src/hook/useProductos.jsx
import { createContext, useContext } from 'react';

export const ProductsContext = createContext(null);

export function useProductos() {
    const context = useContext(ProductsContext);
    if (!context) {
        throw new Error('useProductos debe usarse dentro de ProductsProvider');
    }
    return context;
}