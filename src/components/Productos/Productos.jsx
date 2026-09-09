// /src/componentes/Productos/Productos.jsx
import { ProductoItem as Item } from "@components/Productos/ProductoItem";
import { useFetch } from '@hooks/useFetch';
import { EstadoCarga } from '@ui/EstadoCarga';
import { Section } from "@ui/Section";

export function Productos({
    label,
    mensaje,
    submensaje,
    ctaText,
    ctaLink,
    destacados=false
}) {

    const { datos: todosProductos, error, cargando } = useFetch('/data/productos.json');

    // Filtramos el contenido por "destacados"
    const productos = todosProductos?.filter(producto => producto.destacado === destacados);
    const attr = { label, mensaje, submensaje, ctaText, ctaLink };

    return (
        <>
            <Section {...attr} />
            <div className="productos grid grid-cols-4 gap-4 py-4">
                <EstadoCarga cargando={cargando} error={error} mensajeCargando="Cargando productos, por favor espere...">
                    {productos?.map(producto => <Item key={producto.id} {...producto} />)}
                </EstadoCarga>
            </div>
        </>
    );
}
