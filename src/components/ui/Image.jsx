// /src/components/ui/Image.jsx
function ImagenProducto({ src, alt, width, height = 250 }) {
    return (
        <img
            src={src}
            alt={alt}
            width={width}
            height={height}
            loading="lazy"
            decoding="async"
            className="aspect-square w-full object-cover"
        />
    );
}

function Image({ imagen, alt, width = 250, height = 250 }) {
    const altTexto = `Imagen del producto ${alt}`;
    // Si imagen es un string (URL directa de imgbb)
    if (typeof imagen === 'string') {
        return <ImagenProducto src={imagen} alt={altTexto} width={width} height={height} />;
    }
}

export default Image;
