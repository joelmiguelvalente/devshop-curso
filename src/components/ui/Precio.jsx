// /src/components/ui/Precio.jsx
import { obtenerPrecio, obtenerDescuento } from '@utils/obtenerPrecios';

function Precio({ precio, descuento }) {

    const precioActual = obtenerPrecio(precio);
    const precioFinal = obtenerDescuento(precio, descuento);

    return (
        <>
        {(descuento > 0) ? (
            <>
                <s className="block font-italic font-medium text-sm text-muted">{precioActual}</s>
                <div className="precioFinal font-black flex justify-between items-center gap-2">
                    {precioFinal}
                    {descuento > 0 && (<small className="bg-brand text-brand-foreground font-black text-xs rounded-6 px-2">{descuento}% OFF</small>)}
                </div>
            </>
        ) :
            precioActual
        }
        </>
    )
}

export default Precio;