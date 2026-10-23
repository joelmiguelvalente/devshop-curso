// src/pages/public/Favoritos.jsx
import { COLECCION } from '@constants/collections';
import { Empty } from '@blocks/Empty';
import { useFavoritoNavbar } from '@hooks/useFavorito';
import { useFirestoreQueryByIds } from '@hooks/useFirestore';
import { ProductoItem as Item } from "@public/Producto/ProductoItem";

export const Favoritos = () => {

    const { favoritos, favoritosContar } = useFavoritoNavbar();
    const { data: datos } = useFirestoreQueryByIds(COLECCION.productos, favoritos);

    if (favoritosContar === 0) return <Empty heading="Favoritos está vacío" content="No tienes productos favoritos aún." />;

    return (
        <div className="productos grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 py-4">
            {datos.map(producto => <Item key={producto.id} {...producto} />)}
        </div>
    );
};
