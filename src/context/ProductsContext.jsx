import { useMemo } from 'react';
import { useGetAll } from '@hooks/useFirebaseDB';
import { ProductsContext } from '@hooks/useProductos';

export function ProductsProvider({ children }) {

    const { datos, error, cargando, recargar } = useGetAll('products', {
        orden: ['rating.rate', 'desc']
    });
    const value = useMemo(() => ({ datos, error, cargando, recargar }), [datos, error, cargando, recargar]);

    return (
        <ProductsContext.Provider value={value}>
            {children}
        </ProductsContext.Provider>
    );
}