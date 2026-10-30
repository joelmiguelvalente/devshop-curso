// src/pages/admin/categorias/CategoriasBatch.jsx
// Libreria
import { db } from '@fireconfig/config';
import { doc } from 'firebase/firestore';
// Constante
import { COLECCION } from '@constants/collections';
// Servicio
import { findMany, wBatch } from '@services/firestore.service';

/**
 * Actualiza una categoría y reasigna sus productos cuando cambia el slug.
 * Todo va en un único batch: o se guarda todo, o no se guarda nada.
 */
export async function updateCategoryAndProductsBatch(categoriaId, nuevosDatosCategoria, slugViejo, nuevoSlug) {
    const productos = slugViejo && slugViejo !== nuevoSlug
        ? await findMany(COLECCION.productos, { filters: [['category', '==', slugViejo]] })
        : [];

    const batch = wBatch();
    batch.update(doc(db, COLECCION.categorias, categoriaId), nuevosDatosCategoria);
    productos.forEach(({ id }) => {
        batch.update(doc(db, COLECCION.productos, id), { category: nuevoSlug });
    });

    await batch.commit();
    return productos.length;
}
