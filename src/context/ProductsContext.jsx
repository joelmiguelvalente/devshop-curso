import { useMemo } from 'react';
import { useAllLive } from '@hooks/useQuery';
import { ProductsContext } from '@hooks/useProductos';

export function ProductsProvider({ children }) {

    const { datos, error, cargando, recargar } = useAllLive('products', {
        order: ['rating.rate', 'desc']
    });
    const value = useMemo(() => ({ datos, error, cargando, recargar }), [datos, error, cargando, recargar]);

    return (
        <ProductsContext.Provider value={value}>
            {children}
        </ProductsContext.Provider>
    );
}