// src/pages/public/Producto/ProductoDetalle.jsx
// Librerias
import { Link, useParams } from 'react-router';
import { Bell, ChevronRight, RotateCcw, ShieldCheck, Truck } from 'lucide-react';
// Constante
import { COLECCION } from '@constants/collections';
// Componentes
import { Image } from '@ui/Image';
import { Precio } from '@ui/Precio';
import { Rate } from '@ui/Rate';
import { Button } from '@ui/Button';
import { EstadoCarga } from '@blocks/EstadoCarga';
// Utilidad
import { obtenerPrecio } from '@utils/CompactNumber';
// Hook
import { useFirestoreDoc, useFirestoreQuery } from '@hooks/useFirestore';
// Secciones
import { Beneficio } from '@public/Producto/modulos/Beneficio';
import { Comprar } from '@public/Producto/ProductoComprar';
import { Resenas } from '@public/Producto/modulos/Resenas';
import { Similares } from '@public/Producto/modulos/Similares';

export const ProductoDetalle = () => {
    // Obtenemos el SLUG del parametro /productos/:slug
    const { slug } = useParams();

    const porSlug = useFirestoreQuery(COLECCION.productos, {
        filters: [['slug', '==', slug]],
        limitTo: 1
    });

    // Fallback: documentos sin slug (creados antes o desde el admin) se buscan por ID
    const porId = useFirestoreDoc('products', (!porSlug.loading && porSlug.data.length === 0) ? slug : null);
    const datos = porSlug.data[0] ?? porId.data ?? null;
    const cargando = porSlug.loading || porId.loading;
    const error = porSlug.error || porId.error || (!cargando && !datos ? 'El producto no existe o fue eliminado.' : null);
    // ID real del documento: lo usan el carrito, similares y votos
    const docId     = datos?.id ?? slug;

    const {
        title, description, price, stock, image, category,
        discount, tags, rating, outstanding
    } = datos ?? {};

    const precioFinal = discount > 0 ? price * (1 - discount / 100) : (price ?? 0);
    const valorCuota = obtenerPrecio(precioFinal / 12);

    const buttonStocked = (stock === 0) ? (
        <div className="mt-2 flex justify-center items-center w-full">
            <Button fullWidth>
                <Bell aria-hidden="true" /> Avisame cuando vuelva
            </Button>
        </div>
    ) : <Comprar id={docId} title={title} price={price} stock={stock} discount={discount} />;

    return (
        <EstadoCarga cargando={cargando} error={error} mensajeCargando="Cargando detalles del producto, por favor espere...">
            {datos && (
                <>
                    <nav className="flex items-center gap-2 text-sm pt-6" aria-label="Miga de pan">
                        <Link to="/productos" className="text-brand font-medium">Productos</Link>
                        <ChevronRight size={16} className="text-muted" aria-hidden="true" />
                        <Link to={`/c/${category}`} className="text-muted text-capitalize">{category}</Link>
                    </nav>
                    <div className="producto grid gap-4 lg:gap-6 pt-6">
                        <div className="bg-surface border border-color rounded-lg p-4 lg:p-6">
                            <Image
                                image={image}
                                alt={title}
                                cx="rounded-3 shadow-sm"
                                type="portada"
                            />
                        </div>
                        <div className="flex justify-start items-start flex-col gap-3">
                            <Link to={`/c/${category}`} className="text-sm text-brand font-medium">
                                Ver más productos de {category}
                            </Link>
                            <div className="flex items-center gap-2">
                                <span className="text-sm text-muted">Nuevo</span>
                                {outstanding && <span className="badge badge-warning">Más vendido</span>}
                            </div>
                            <h1 className="text-2xl font-bold">{title}</h1>
                            {rating && <Rate rating={rating} />}
                            <div className="tags flex justify-start items-start gap-2">
                                {tags?.map((tag, i) => (
                                    <small key={i+1} className={`badge text-brand font-bold tag-${i+1}`}>#{tag}</small>
                                ))}
                            </div>
                            <Precio
                                price={price}
                                discount={discount}
                            />
                            <p className="mt-2 flex items-center gap-2 text-sm text-success font-medium">
                                <Truck size={18} aria-hidden="true" /> Envío gratis a todo el país
                            </p>
                            <p className={`text-sm font-medium ${stock > 0 ? 'text-success' : 'text-error'}`}>
                                {stock > 0 ? `Stock disponible (${stock} unidades)` : 'Sin stock'}
                            </p>
                            <p className="text-sm text-success font-medium">
                                Mismo precio en 12 cuotas de {valorCuota} sin interés
                            </p>
                            {buttonStocked}
                            <div className="border-t border-color" />
                            <Beneficio icon={<ShieldCheck size={32} aria-hidden="true" />} title="Compra protegida">
                                Recibí el producto o te devolvemos el dinero.
                            </Beneficio>
                            <Beneficio icon={<RotateCcw size={32} aria-hidden="true" />} title="Devolución gratis">
                                Tenés 30 días desde la entrega.
                            </Beneficio>
                        </div>
                    </div>
                    <section className="bg-surface border border-color rounded-lg p-6 mt-6">
                        <h2 className="text-2xl font-bold mb-4">Descripción</h2>
                        <p className="text-muted">{description}</p>
                    </section>
                    <Similares productId={docId} category={category} />
                    <Resenas productId={docId} rating={rating} />
                </>
            )}
        </EstadoCarga>
    );
}
