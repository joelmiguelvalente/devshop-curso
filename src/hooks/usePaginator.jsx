import { useState,useMemo } from 'react';

export function usePaginator(items, porPagina = 4) {
    const [paginaActual, setPaginaActual] = useState(1);
    const totalPaginas = Math.max(1, Math.ceil(items.length / porPagina));


    const inicio = (paginaActual - 1) * porPagina;
    const fin = inicio + porPagina;
    const productosVisibles = items.slice(inicio, fin);

    const puedeAnterior = paginaActual > 1;
    const puedeSiguiente = paginaActual < totalPaginas;

    function anterior() {
        setPaginaActual((p) => Math.max(1, p - 1));
    }

    function siguiente() {
        setPaginaActual((p) => Math.min(totalPaginas, p + 1));
    }

    function irAPagina(n) {
        if (n >= 1 && n <= totalPaginas) setPaginaActual(n);
    }

    return {
        paginaActual, totalPaginas, inicio, fin, productosVisibles,
        puedeAnterior, puedeSiguiente, anterior, siguiente, irAPagina
    };
}

export function usePaginatorNumbers(items, porPagina = 4) {
    // No repetimos las cuentas: el hook simple ya da página, límites y slice.
    const pagina = usePaginator(items, porPagina);

    const numeros = Array.from(
        { length: pagina.totalPaginas },
        (_, indice) => indice + 1
    );

    return { ...pagina, numeros };
}

function construirPaginas(actual, total, ventana = 5) {
    // Si hay pocas, mostramos todas igual que en el paso 2.
    if (total <= ventana + 2) {
        return Array.from({ length: total }, (_, i) => ({
            tipo: 'numero', valor: i + 1
        }));
    }

    // Ventana de 6: 2 antes + la actual + 3 después.
    let izq = Math.max(2, actual - Math.floor((ventana - 1) / 2));
    let der = Math.min(total - 1, izq + ventana - 1);
    izq = Math.max(2, der - ventana + 1); // corro si se pasó del final

    const resultado = [{ tipo: 'numero', valor: 1 }]; // el 1 siempre va

    if (izq > 2) {
        // Hueco entre el 1 y la ventana → punto suspensivo a la izquierda
        resultado.push({
            tipo: 'dots', dir: -1, destino: Math.max(1, izq - ventana)
        });
    }

    for (let p = izq; p <= der; p++) {
        resultado.push({ tipo: 'numero', valor: p });
    }

    if (der < total - 1) {
        // Hueco hasta el final → punto suspensivo a la derecha
        resultado.push({
            tipo: 'dots', dir: 1, destino: Math.min(total, der + ventana + 1)
        });
    }

    resultado.push({ tipo: 'numero', valor: total }); // el último siempre va
    return resultado;
}

export function usePaginatorAdvance(items, porPagina = 4, ventana = 5) {
    const pagina = usePaginatorNumbers(items, porPagina);

    // useMemo evita recalcular si no cambiaron página, total o ventana.
    const paginas = useMemo(
        () => construirPaginas(pagina.paginaActual, pagina.totalPaginas, ventana),
        [pagina.paginaActual, pagina.totalPaginas, ventana]
    );

    return { ...pagina, paginas, ventana };
}