// /src/pages/public/Productos.jsx
import { ProductoItem as Item } from "@components/Productos/ProductoItem";
import { useAll } from '@hooks/useQuery';
import { EstadoCarga } from '@ui/EstadoCarga';

export function Productos({
    destacados=false,
    limite = 0
}) {

    const { datos, error, cargando } = useAll('products', {
        order: ['rating.rate', 'desc'],
        filters: [['outstanding', '==', destacados]],
        limit: limite > 0 ? limite : undefined
    });

    return (
        <EstadoCarga cargando={cargando} error={error} mensajeCargando="Cargando productos, por favor espere...">
            <div className="productos grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 py-4">
                {datos.map(producto => <Item key={producto.id} {...producto} />)}
            </div>
        </EstadoCarga>
    );
}
