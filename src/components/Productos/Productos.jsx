// /src/componentes/Productos/Productos.jsx
import { ProductoItem as Item } from "@components/Productos/ProductoItem";
import { useFetch } from '@hooks/useFetch';
import { EstadoCarga } from '@ui/EstadoCarga';

export function Productos({
    destacados=false,
    limite = 0
}) {

    const { datos, error, cargando } = useFetch('/data/productos.json');

    // Filtramos el contenido por "destacados"
    let productos = datos?.filter(producto => producto.outstanding === destacados) ?? [];
    if(limite > 0) {
        productos = productos.slice(0, limite);
    }

    return (
        <>
            <EstadoCarga cargando={cargando} error={error} mensajeCargando="Cargando productos, por favor espere...">
                <div className="productos grid grid-cols-4 gap-4 py-4">
                    {productos?.map(producto => <Item key={producto.id} {...producto} />)}
                </div>
            </EstadoCarga>
        </>
    );
}
