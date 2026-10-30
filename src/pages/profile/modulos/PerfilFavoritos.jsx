// src/pages/profile/modulos/PerfilFavoritos.jsx
// Constante
import { COLECCION } from '@constants/collections';
// Componentes
import { Empty } from '@blocks/Empty';
// Hooks
import { useFavoritoNavbar } from '@hooks/useFavorito';
import { useFirestoreQueryByIds } from '@hooks/useFirestore';
// Seccion
import { ProductoItem as Item } from '@public/Producto/ProductoItem';

export function PerfilFavoritos() {

    const { favoritos, favoritosContar } = useFavoritoNavbar();
    const { data: datos } = useFirestoreQueryByIds(COLECCION.productos, favoritos);

    if (favoritosContar === 0) {
        return <Empty heading="No tenés favoritos todavía" content="Marcá productos con el corazón y van a aparecer acá." />;
    }

    return (
        <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 py-4">
            {datos.map(producto => <Item key={producto.id} {...producto} />)}
        </div>
    );
}
