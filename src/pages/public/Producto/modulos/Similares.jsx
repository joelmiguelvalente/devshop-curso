// src/pages/public/Producto/modulos/Similares.jsx
// Constante
import { COLECCION } from '@constants/collections';
// Hook
import { useFirestoreQuery } from '@hooks/useFirestore';
// Seccion
import { ProductoItem as Item } from "@public/Producto/ProductoItem";

// Misma categoría primero; si hay pocas coincidencias se rellena con otros
// productos (sin repetir el actual). Una sola consulta: el reparto es local.
export function Similares({ productId, category }) {
    const { data } = useFirestoreQuery(COLECCION.productos, { limitTo: 8 });

    const resto = (data ?? []).filter(p => p.id !== productId);
    const mismos = resto.filter(p => category && p.category === category);
    const otros = resto.filter(p => !category || p.category !== category);
    const items = [...mismos, ...otros].slice(0, 4);
    if (items.length === 0) return null;

    return (
        <section className="mt-6">
            <h2 className="text-2xl font-bold mb-4">También te puede interesar</h2>
            <div className="productos grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 py-4">
                {items.map(producto => <Item key={producto.id} {...producto} />)}
            </div>
        </section>
    );
}
