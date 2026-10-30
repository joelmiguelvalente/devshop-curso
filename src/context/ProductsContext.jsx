// src/context/ProductsContext.js
import { useMemo } from 'react';
// Constante
import { COLECCION } from '@constants/collections';
// Hooks
import { ProductsContext } from '@hooks/useProductos';
import { useFirestoreLive } from '@hooks/useFirestore';

export function ProductsProvider({ children }) {

    const { data, error, loading } = useFirestoreLive(COLECCION.productos, {
        order: ['rating.rate', 'desc']
    });
    const value = useMemo(() => ({ data, error, loading }), [data, error, loading]);

    return (
        <ProductsContext.Provider value={value}>
            {children}
        </ProductsContext.Provider>
    );
}