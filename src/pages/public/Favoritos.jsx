// src/pages/public/Favoritos.jsx
// Constante
import { COLECCION } from '@constants/collections';
import { Title } from '@constants/configuration';
// Componente
import { Empty } from '@blocks/Empty';
import { SEO } from '@components/seo/SEO';
// Hooks
import { useFavoritoNavbar } from '@hooks/useFavorito';
import { useFirestoreQueryByIds } from '@hooks/useFirestore';
// Seccion
import { ProductoItem as Item } from "@public/Producto/ProductoItem";

export const Favoritos = () => {

    const { favoritos, favoritosContar } = useFavoritoNavbar();
    const { data: datos } = useFirestoreQueryByIds(COLECCION.productos, favoritos);

    if (favoritosContar === 0) return <Empty heading="Favoritos está vacío" content="No tienes productos favoritos aún." />;

    return (
        <div className="productos grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 py-4">
            <SEO
                title={`Mis favoritos | ${Title}`}
                description={`Tus productos favoritos guardados en ${Title}.`}
                canonical="/favoritos"
            />
            {datos.map(producto => <Item key={producto.id} {...producto} />)}
        </div>
    );
};
