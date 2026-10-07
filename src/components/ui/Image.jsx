// /src/components/ui/Image.jsx
import { cn } from "@utils/Utils";
function fallback(e) {
    const fb  = '/images/logo_medium.webp';
    if (e.target.src !== fb) e.target.src = fb;
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
    return (
        <img
            srcSet={isLink ? undefined : `${thumbnail} 320w, ${medium} 800w`}
            sizes="(max-width: 320px) 280px, (max-width: 480px) 440px, 800px"
            src={original}
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

function Image({ type = 'portada', ...props }) {
    if(type === 'portada') {
        return Portada({...props});
    }
    if(type === 'avatar') {
        const { image, cx, nombre, alt, size } = props;
        // Acepta URL directa (ImgBB) o ID local de /images/avatar/
        const isLink = typeof image === 'string' && image.startsWith('http');
        return <img
            className={cn("aspect-square object-cover", (cx !== '') && cx)}
            src={isLink ? image : getPathImage(image, 'avatar')}
            alt={nombre ?? alt}
            width={size ?? "120"}
            height={size ?? "120"}
            onError={e => fallback(e)}
        />
    }
    return null;
}

export default Image;
