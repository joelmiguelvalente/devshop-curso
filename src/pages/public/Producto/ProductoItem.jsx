// src/pages/public/Home/ProductoItem.jsx
// Libreria
import { Link } from "react-router";
import { Bell } from 'lucide-react';
// Componentes
import { Badge } from '@ui/Badge';
import { Button } from '@ui/Button';
import { Image } from '@ui/Image';
import { Precio } from '@ui/Precio';
import { Rate } from '@ui/Rate';
// Seccion
import { Comprar } from '@public/Producto/ProductoComprar';

export function ProductoItem({
    id,
    slug,
    title,
    price,
    category,
    rating,
    image,
    stock = 0,
    discount = 0,
    outstanding = false
}) {

    const btn = (stock === 0) ? (
        <div className="mt-2 flex justify-center items-center w-full">
            <Button fullWidth>
                <Bell aria-hidden="true" /> Avisame cuando vuelva
            </Button>
        </div>
    ) : <Comprar id={id} title={title} price={price} stock={stock} discount={discount} />;

    return (
        <article className={`producto relative bg-background overflow-hidden shadow-md rounded-3${outstanding ? ' border-t border-3 border-brand' : ' border'}`}>
            <Link to={`/c/${category}`}>
                <Badge content={category} variant="surface" size="sm" cx="categoria absolute text-capitalize top-1 left-1" />
            </Link>
            <Link className="block text-lg text" to={`/productos/${slug ?? id}`}>
                <Image
                    image={image}
                    alt={title}
                    type="portada"
                />
            </Link>
            <div className="informacion p-3 flex justify-start items-start flex-col">
                <Link className="block text-lg text" to={`/productos/${slug ?? id}`}>{title}</Link>
                <div style={{ height: "4rem" }} className="font-black relative flex justify-end items-start flex-col w-full py-1">
                    <Precio
                        price={price}
                        discount={discount}
                        size="xl"
                    />
                </div>
                <Rate rating={rating} />
                {btn}
            </div>
        </article>
    )
}
