// /src/components/Productos/ProductoItem.jsx
import { Link } from "react-router";
import { Comprar } from '@components/Productos/ProductoCompra';
import Image from '@ui/Image';
import Precio from '@ui/Precio';

export function ProductoItem({
    id,
    title,
    price,
    excerpt,
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
                <Link className="block text-lg" to={`/producto/${id}`}>{title}</Link>
                <div style={{ height: "50px" }} className="my-1 font-black text-xl relative flex justify-center items-start flex-col">
                    <Precio
                        precio={price}
                        descuento={discount}
                    />
                </div>
                <p className="text-sm">{excerpt}</p>
                <Comprar
                    id={id}
                    nombre={title}
                    precio={price}
                    stock={stock}
                />
                <span style={{ top: ".5rem", right: ".5rem" }} className="absolute rounded-6 categoria font-medium inline-block px-3 text-sm font-black bg-surface text-brand text-capitalize">{category}</span>
            </div>
        </article>
    )
}
