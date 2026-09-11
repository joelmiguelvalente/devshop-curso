// /src/components/Productos/ProductoItem.jsx
import { ItemButtonCart } from '@components/Productos/ItemButtonCart';
import Image from '@ui/Image';
import Precio from '@ui/Precio';

export function ProductoItem({
    id,
    title,
    price,
    description,
    category,
    stock = 0,
    discount = 0,
    outstanding = false
}) {

    // Tamaños thumbnail, small, large | Extensiones png, webp
    const imagen = '/images/productos/PROD' + id + '/small.png';

    return (
        <article className={`producto relative bg-background overflow-hidden shadow-md rounded-3${outstanding ? ' border-t border-3 border-brand' : ' border'}${stock === 0 ? ' empty-prod' : ''}`}>
            <Image
                imagen={imagen}
                alt={title}
            />
            <div className="informacion p-3 flex justify-start items-start flex-col">
                <h3 className="block text-lg">{title}</h3>
                <div style={{ height: "50px" }} className="my-1 font-black text-xl relative flex justify-center items-start flex-col">
                    <Precio
                        precio={price}
                        descuento={discount}
                    />
                </div>
                <p className="text-sm">{description}</p>
                <ItemButtonCart
                    id={id}
                    nombre={title}
                    stock={stock}
                />
                <span style={{ top: ".5rem", right: ".5rem" }} className="absolute rounded-6 categoria font-medium inline-block px-3 text-sm font-black bg-surface text-brand text-capitalize">{category}</span>
            </div>
        </article>
    )
}
