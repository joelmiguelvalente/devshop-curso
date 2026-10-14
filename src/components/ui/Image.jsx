// /src/components/ui/Image.jsx
import { useEffect, useState } from 'react';
import { cn } from "@utils/Utils";

// Placeholder visible mientras carga + fallback si falla.
// Es la misma imagen precargada en index.html, asi el primer pintado es instantaneo.
const FALLBACK_SRC = '/images/logo_medium.webp';
function fallback(e) {
    const img = e.currentTarget;
    // e.target.src devuelve URL absoluta, nunca seria === a la ruta relativa,
    // asi que se usa un flag para no reintentar si el fallback tambien falla.
    if (img.dataset.fbk) return;
    img.dataset.fbk = '1';
    img.onerror = null;
    img.src = FALLBACK_SRC;
}

// Devuelve true cuando la imagen real ya esta en cache y lista para mostrar.
// Mientras tanto el <img> visible muestra el logo (sin caja gris).
function useReadySrc({ src, srcSet, sizes }) {
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
function getPathImage(id, path = 'productos') {
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

function Portada({ image, alt, width, height, cx }) {
    const alternative = (alt === '') ? 'DevShop' : `Imagen del producto ${alt}`;
    // Tamaños thumbnail, small, large | Extensiones png, webp
    // image puede ser un ID local (PROD1234) o una URL directa (ImgBB)
    const isLink = typeof image === 'string' && image.startsWith('http');
    const { original, medium, thumbnail } = isLink
        ? { original: image, medium: image, thumbnail: image }
        : getPathImage(image);
    const srcSetValue = isLink ? undefined : `${thumbnail} 320w, ${medium} 800w`;
    const sizesValue = "(max-width: 320px) 280px, (max-width: 480px) 440px, 800px";
    const ready = useReadySrc({ src: original, srcSet: srcSetValue, sizes: sizesValue });
    return (
        <img
            srcSet={ready ? srcSetValue : undefined}
            sizes={sizesValue}
            src={ready ? original : FALLBACK_SRC}
            alt={alternative}
            width={width}
            height={height}
            loading="eager"
            decoding="async"
            className={cn("w-full object-cover", (cx !== '') && cx)}
            onError={e => fallback(e)}
        />
    );
}

function AvatarImg({ image, cx, nombre, alt, size }) {
    // Acepta URL directa (ImgBB) o ID local de /images/avatar/
    const isLink = typeof image === 'string' && image.startsWith('http');
    const realSrc = isLink ? image : getPathImage(image, 'avatar');
    const ready = useReadySrc({ src: realSrc });
    return <img
        className={cn("aspect-square object-cover", (cx !== '') && cx)}
        src={ready ? realSrc : FALLBACK_SRC}
        alt={nombre ?? alt}
        width={size ?? "120"}
        height={size ?? "120"}
        onError={e => fallback(e)}
    />
}

function Image({ type = 'portada', ...props }) {
    if(type === 'avatar') {
        return <AvatarImg {...props} />;
    }
    return Portada({...props});
}

export default Image;
