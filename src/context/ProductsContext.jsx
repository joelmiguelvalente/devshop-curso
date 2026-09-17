import { useFetch } from '@hooks/useFetch';
import { ProductsContext } from '@hooks/useProductos';

export function ProductsProvider({ children }) {
    const { datos, error, cargando } = useFetch('/data/productos.json');
    return (
        <ProductsContext.Provider value={{ datos, error, cargando }}>
            {children}
        </ProductsContext.Provider>
    );
}