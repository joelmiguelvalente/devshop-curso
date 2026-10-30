// src/pages/public/Home/Productos.jsx
// Libreria
import { useParams } from "react-router";
// Constante
import { COLECCION } from '@constants/collections';
// Componente
import { EstadoCarga } from '@blocks/EstadoCarga';
import { Paginator, PageWrap, PagePrev, PageNext, PageCount } from '@ui/Paginator';
// Hook
import { useFirestoreQuery } from '@hooks/useFirestore';
// Seccion
import { ProductoItem as Item } from "@public/Producto/ProductoItem";

export function Productos({
    destacados=false,
    limite = 0
}) {
    // Obtenemos el ID del parametro /productos/:id
    const { categoria } = useParams();

    // Custom Hook
    const { data: datosAPaginar, error, loading: cargando } = useFirestoreQuery(COLECCION.productos, {
        order: ['rating.rate', 'desc'],
        filters: [categoria ?
            ['category', '==', categoria] :
            ['outstanding', '==', destacados]
        ],
        limitTo: limite > 0 ? limite : undefined
    });

    const { data, current, next, prev, total } = Paginator({
        data: datosAPaginar,
        limit: 8
    });

    return (
        <EstadoCarga cargando={cargando} error={error} mensajeCargando="Cargando productos, por favor espere...">
            {total > 1 && (
                <PageWrap>
                    <PagePrev prev={prev} current={current} />
                    <PageCount current={current} total={total} />
                    <PageNext next={next} current={current} total={total} />
                </PageWrap>
            )}
            <div className="productos grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 py-4">
                {data.map(producto => <Item key={producto.id} {...producto} />)}
            </div>
            {total > 1 && (
                <PageWrap>
                    <PagePrev prev={prev} current={current} />
                    <PageCount current={current} total={total} />
                    <PageNext next={next} current={current} total={total} />
                </PageWrap>
            )}
        </EstadoCarga>
    );
}
