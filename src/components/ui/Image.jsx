// /src/components/ui/Image.jsx
function fallback(e) {
    const fb  = '/images/logo_medium.webp';
    if (e.target.src !== fb) e.target.src = fb;
}

// Devuelve un object o un string
function getPathImage(id, path = 'productos') {
    let newPath;
    const pathInit = `/images/${path}`;
    if(path === 'productos') {
        newPath = `${pathInit}/PROD${id}`;
        return {
            medium:     newPath + '/small.webp',
            original:   newPath + '/large.webp',
            thumbnail:  newPath + '/thumbnail.webp'
        };
    }
    if(path === 'avatar') {
        return `${pathInit}/avatar${id}.svg`;
    }
}

function Portada({ id, alt, width, height, cx }) {
    const alternative = (alt === '') ? 'DevShop' : `Imagen del producto ${alt}`;
    // Tamaños thumbnail, small, large | Extensiones png, webp
    const { original, medium, thumbnail }  = getPathImage(id);
    return (
        <img
            srcSet={`${thumbnail} 320w, ${medium} 800w`}
            sizes="(max-width: 320px) 280px, (max-width: 480px) 440px, 800px"
            src={original}
            alt={alternative}
            width={width}
            height={height}
            loading="eager"
            decoding="async"
            className={`w-full object-cover ${cx}`}
            onError={e => fallback(e)}
        />
    );
}

function Image({ type = 'portada', ...props }) {
    if(type === 'portada') {
        return Portada({...props});
    }
    if(type === 'avatar') {
        const { id, cx, nombre, alt, size } = props;
        return <img
            className={`aspect-square object-cover ${cx}`}
            src={getPathImage(id, 'avatar')}
            alt={nombre ?? alt}
            width={size ?? "120"}
            height={size ?? "120"}
            onError={e => fallback(e)}
        />
    }
    return null;
}

export default Image;
