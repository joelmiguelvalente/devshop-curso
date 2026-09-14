// src/pages/ProductoDetalle.jsx
import { useParams } from "react-router";
import { useFetch } from '@hooks/useFetch';
import { EstadoCarga } from '@ui/EstadoCarga';
import Image from '@ui/Image';
import Precio from '@ui/Precio';

export const ProductoDetalle = () => {

    const { id } = useParams();
    const { datos, cargando, error } = useFetch('/data/productos.json');
    const producto = datos?.find(p => String(p.id) === id) ?? {};
    // outstanding, image
    const { title, description, price, stock, category, rating, discount, tags } = producto;

    const imagen = '/images/productos/PROD' + id + '/large.png';

    return (
        <>
            <EstadoCarga cargando={cargando} error={error} mensajeCargando="Cargando detalles del producto, por favor espere...">
                <div className="producto grid gap-3">
                    <div className="portada relative">
                        <Image
                            imagen={imagen}
                            alt={title}
                            width="auto"
                            cx="rounded-3 shadow-sm"
                            height="auto"
                        />
                        <span className="category rounded-6 absolute font-medium inline-block px-3 text-sm font-black bg-surface text-brand text-capitalize">{category}</span>
                        <span className="stock rounded-6 absolute font-medium inline-block px-3 text-sm font-black bg-surface text-brand text-capitalize">{stock <= 0 ? 'Sin stock' : 'En stock'}</span>
                    </div>
                    <div className="grow-1">
                        <div className="flex justify-start items-start flex-col gap-4 px-4">
                            <div>
                                <div className="tags flex justify-start items-start gap-2">
                                    {tags?.map((tag, i) => (
                                        <small key={i+1} className={`badge text-brand font-bold tag-${i}`}>#{tag}</small>
                                    ))}
                                </div>
                                <h1 className="text-3xl">{title}</h1>
                            </div>
                            <p className="text-secondary text-lg" style={{ lineHeight: "2rem" }}>{description}</p>
                            <Precio
                                precio={price}
                                descuento={discount}
                            />
                            {rating != null && (
                            <p className="rate text-lg mt-4" aria-label={`Puntuación ${rating.rate} sobre 5 con ${rating.count} votos`}>
                                ⭐ {rating.rate.toFixed(1)}
                                <span className="block text-sm">({rating.count} votos)</span>
                            </p>
                            )}
                        </div>
                    </div>
                </div>
            </EstadoCarga>
        </>
    );
}