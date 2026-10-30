// src/components/blocks/Empty.jsx
// Libreria
import { Inbox, Search, TriangleAlert, Construction } from 'lucide-react';

// Presets: icono + textos por defecto. heading/content siempre se pueden pisar
const TIPOS = {
    lista: {
        Icono:    Inbox,
        heading:  'Todavía no hay nada acá',
        content:  'Cuando se agreguen elementos, van a aparecer en esta sección.'
    },
    busqueda: {
        Icono:    Search,
        heading:  'Sin resultados',
        content:  'No encontramos nada con esa búsqueda. Probá con otros términos o limpiá los filtros.'
    },
    error: {
        Icono:    TriangleAlert,
        heading:  'Algo salió mal',
        content:  'No pudimos cargar la información. Intentá de nuevo en unos segundos.'
    },
    proximo: {
        Icono:    Construction,
        heading:  'Próximamente',
        content:  'Esta sección sigue en construcción.'
    }
};

/**
 * Estado vacío / informativo.
 * @param {string} [tipo]     - 'lista' | 'busqueda' | 'error' | 'proximo'
 * @param {string} [heading]  - Pisa el texto del preset
 * @param {string} [content]  - Pisa el texto del preset
 * @param {number} [iconSize]
 * @param {Node}   [children] - Acción opcional (botón "Agregar", "Reintentar"...)
 */
export function Empty({ tipo = 'lista', heading, content, iconSize = 48, children }) {
    const { Icono, heading: hDefecto, content: cDefecto } = TIPOS[tipo] ?? TIPOS.lista;

    return (
        <div className="empty">
            <Icono size={iconSize} aria-hidden="true" className="mx-auto text-muted" />
            <h2 className="text-4xl pb-4">{heading ?? hDefecto}</h2>
            <p className="text-xl">{content ?? cDefecto}</p>
            {children}
        </div>
    );
}
