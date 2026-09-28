// src/pages/ProductoDetalle.jsx
import { useParams } from "react-router";
import { Bell } from 'lucide-react';
import { Comprar } from '@components/Productos/ProductoCompra';
import { useGetSingle } from '@hooks/useFirebaseDB';
import { Badge } from '@ui/Badge';
import { EstadoCarga } from '@ui/EstadoCarga';
import { Button } from '@ui/Button';
import Image from '@ui/Image';
import Precio from '@ui/Precio';

export const ProductoDetalle = () => {
    // Obtenemos el ID del parametro /producto/:id
    const { id } = useParams();
    const { datos, error, cargando } = useGetSingle('products', id);

    const {
        title, description, price, stock, image, category, discount, tags
    } = datos ?? {};

    const buttonStocked = (stock === 0) ? (
        <div className="mt-2 flex justify-center items-center w-full">
            <Button fullWidth>
                <Bell aria-hidden="true" /> Avisame cuando vuelva
            </Button>
        </div>
    ) : <Comprar id={id} title={title} price={price} stock={stock} />;

    return (
        <EstadoCarga cargando={cargando} error={error} mensajeCargando="Cargando detalles del producto, por favor espere...">
            {datos && (
                <div className="producto grid gap-3">
                    <div className="portada relative">
                        <Image
                            image={image}
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
                            {buttonStocked}
                        </div>
                    </div>
                </div>
            )}
        </EstadoCarga>
    );
}
