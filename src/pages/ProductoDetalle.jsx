// src/pages/ProductoDetalle.jsx
import { useParams } from "react-router";
import { useProductos } from '@hooks/useProductos';
import { EstadoCarga } from '@ui/EstadoCarga';
import { Comprar } from '@components/Productos/ProductoCompra';
import { Badge } from '@ui/Badge';
import Image from '@ui/Image';
import Precio from '@ui/Precio';

export const ProductoDetalle = () => {
    // Obtenemos el ID del parametro /producto/:id
    const { id }                     = useParams();
    const { datos, cargando, error } = useProductos();
    // Por el momento no usaremos: outstanding, image
    const {
        title, description, price, stock, category, discount, tags
    } = datos?.find(p => String(p.id) === id) ?? {};

    return (
        <>
            <EstadoCarga cargando={cargando} error={error} mensajeCargando="Cargando detalles del producto, por favor espere...">
                <div className="producto grid gap-3">
                    <div className="portada relative">
                        <Image
                            id={id}
                            alt={title}
                            cx="rounded-3 shadow-sm"
                            type="portada"
                        />
                        <Badge content={category} variant="surface" size="sm" cx="category absolute text-capitalize" />
                        <Badge content={stock <= 0 ? 'Sin stock' : 'En stock'} variant="surface" size="sm" cx="stock absolute text-capitalize" />
                    </div>
                    <div className="grow-1">
                        <div className="flex justify-start items-start flex-col gap-4 px-4">
                            <div>
                                <div className="tags flex justify-start items-start gap-2">
                                    {tags?.map((tag, i) => (
                                        <small key={i+1} className={`badge text-brand font-bold tag-${i+1}`}>#{tag}</small>
                                    ))}
                                </div>
                                <h1 className="text-3xl">{title}</h1>
                            </div>
                            <p className="text-secondary text-lg" style={{ lineHeight: "2rem" }}>{description}</p>
                            <Precio
                                price={price}
                                discount={discount}
                            />
                            <Comprar
                                id={id}
                                title={title}
                                price={price}
                                stock={stock}
                            />
                        </div>
                    </div>
                </div>
            </EstadoCarga>
        </>
    );
}