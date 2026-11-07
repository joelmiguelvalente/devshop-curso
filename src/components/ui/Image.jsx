// /src/components/ui/Image.jsx
// Utilidades
import { cn } from '@utils/Utils';
import { FALLBACK_SRC, useReadySrc, getPathImage } from '@utils/ImageHelpers';

function fallback(e) {
    const img = e.currentTarget;
    // e.target.src devuelve URL absoluta, nunca seria === a la ruta relativa,
    // asi que se usa un flag para no reintentar si el fallback tambien falla.
    if (img.dataset.fbk) return;
    img.dataset.fbk = '1';
    img.onerror = null;
    img.src = FALLBACK_SRC;
}

function Portada({ image, alt, width, height, cx }) {
    const alternative = (alt === '') ? 'DevShop' : `Imagen del producto ${alt}`;

    // Resuelve las 3 medidas (thumbnail / small / large) segun el origen.
    let thumbnail;
    let small;
    let large;

    if (image && typeof image === 'object') {
        thumbnail = image.thumbnail;
        small = image.small ?? image.medium;
        large = image.large ?? image.original;
    } else if (typeof image === 'string' && image.startsWith('http')) {
        const hasExtension = /\.\w{3,4}$/.test(image);
        if (hasExtension) {
            thumbnail = small = large = image;
        } else {
            thumbnail = `${image}/thumbnail.webp`;
            small = `${image}/small.webp`;
            large = `${image}/large.webp`;
        }
    } else {
        // Imagen local en /public/images/productos/
        const paths = getPathImage(image);
        thumbnail = paths.thumbnail;
        small = paths.small ?? paths.medium;
        large = paths.large ?? paths.original;
    }

    const ready = useReadySrc({ src: large });

    return (
        <picture>
            <source
                media="(max-width: 767px)"
                srcSet={ready ? thumbnail : FALLBACK_SRC}
            />
            <source
                media="(max-width: 991px)"
                srcSet={ready ? small : FALLBACK_SRC}
            />
            <img
                src={ready ? large : FALLBACK_SRC}
                alt={alternative}
                width={width}
                height={height}
                loading="eager"
                decoding="async"
                className={cn("w-full object-cover", (cx !== '') && cx)}
                onError={e => fallback(e)}
            />
        </picture>
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

export const Image = ({ type = 'portada', ...props }) => {
    if (type === 'avatar') {
        return <AvatarImg {...props} />;
    }
    return Portada({...props});
}