import { useEffect, useState } from 'react';

// Placeholder visible mientras carga + fallback si falla.
export const FALLBACK_SRC = '/images/logo_medium.webp';

// Devuelve true cuando la imagen real ya esta en cache y lista para mostrar.
export function useReadySrc({ src, srcSet, sizes }) {
    const [ready, setReady] = useState(false);
    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setReady(false);
        if (!src || src === FALLBACK_SRC) { setReady(true); return; }
        let cancelled = false;
        const done = (ok) => { if (!cancelled && ok) setReady(true); };
        const pre = new window.Image();
        if (srcSet) pre.srcset = srcSet;
        if (sizes) pre.sizes = sizes;
        pre.src = src;
        pre.onload = () => done(true);
        // Si la real falla, nos quedamos con el logo (= fallback). Sin reintentos.
        pre.onerror = () => done(false);
        if (pre.complete && pre.naturalWidth > 0) done(true);
        return () => { cancelled = true; pre.onload = null; pre.onerror = null; };
    }, [src, srcSet, sizes]);
    return ready;
}

// Devuelve un object o un string
export function getPathImage(id, path = 'productos') {
    if(path === 'productos') {
        return {
            medium:     id + '/small.webp',
            original:   id + '/large.webp',
            thumbnail:  id + '/thumbnail.webp'
        };
    }
    if(path === 'avatar') {
        return `/images/${path}/${id}.svg`;
    }
}