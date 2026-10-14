// src/context/ProductsContext.js
import { useMemo } from 'react';
import { useFirestoreLive } from '@hooks/useFirestore';
import { ProductsContext } from '@hooks/useProductos';

export function ProductsProvider({ children }) {

    const { data, error, loading } = useFirestoreLive('products', {
        order: ['rating.rate', 'desc']
    });
    const value = useMemo(() => ({ data, error, loading }), [data, error, loading]);

    return (
        <ProductsContext.Provider value={value}>
            {children}
        </ProductsContext.Provider>
    );
}