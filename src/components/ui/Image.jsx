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

export const Image = ({ type = 'portada', ...props }) => {
    if(type === 'avatar') {
        return <AvatarImg {...props} />;
    }
    return Portada({...props});
}