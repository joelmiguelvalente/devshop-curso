// src/pages/public/Home/Productos.jsx
import { useParams } from "react-router";
import { COLECCION } from '@constants/collections';
import { EstadoCarga } from '@blocks/EstadoCarga';
import { useFirestoreQuery } from '@hooks/useFirestore';
import { ProductoItem as Item } from "@public/Producto/ProductoItem";

export function Productos({
    destacados=false,
    limite = 0
}) {
    // Obtenemos el ID del parametro /productos/:id
    const { categoria } = useParams();

    // Custom Hook
    const { data: datos, error, loading: cargando } = useFirestoreQuery(COLECCION.productos, {
        order: ['rating.rate', 'desc'],
        filters: [categoria ?
            ['category', '==', categoria] :
            ['outstanding', '==', destacados]
        ],
        limitTo: limite > 0 ? limite : undefined
    });

    return (
        <EstadoCarga cargando={cargando} error={error} mensajeCargando="Cargando productos, por favor espere...">
            <div className="productos grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 py-4">
                {datos.map(producto => <Item key={producto.id} {...producto} />)}
            </div>
        </EstadoCarga>
    );
}
