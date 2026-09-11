// /src/components/Productos/ProductoItem.jsx
import { ItemButtonCart } from '@components/Productos/ItemButtonCart';
import Image from '@ui/Image';
import Precio from '@ui/Precio';

export function ProductoItem({
    id,
    nombre,
    precio,
    descripcion,
    categoria,
    stock = 0,
    descuento = 0,
    destacado = false
}) {

    // Tamaños thubnails, small, large | Extensiones png, webp
    const imagen = '/images/productos/PROD' + id + '/small.png';

    return (
        <article className={`producto relative bg-background overflow-hidden shadow-md rounded-3${destacado ? ' border-t border-3 border-brand' : ' border'}${stock === 0 ? ' empty-prod' : ''}`}>
            <Image imagen={imagen} alt={nombre}  />
            <div className="informacion p-3 flex justify-start items-start flex-col">
                <h3 className="block text-lg">{nombre}</h3>
                <div style={{ height: "50px" }} className="my-1 font-black text-xl relative flex justify-center items-start flex-col">
                    <Precio precio={precio} descuento={descuento} />
                </div>
                <ItemButtonCart id={id} nombre={nombre} stock={stock} descripcion={descripcion} />
                <span style={{ top: ".5rem", right: ".5rem" }} className="absolute rounded-6 categoria font-medium inline-block px-3 text-sm font-black bg-surface text-brand">{categoria}</span>
            </div>
        </article>
    )
}
