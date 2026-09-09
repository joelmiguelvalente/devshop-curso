// /src/components/ui/Precio.jsx

import { FormatearPrecio } from '@utils/formatearPrecio';

function Precio({ precio, descuento }) {

    const { precioFinal, precioActual } = FormatearPrecio(precio, descuento);

    return (
        <>
        {(descuento > 0) ? (
            <>
                <s className="block font-italic font-medium text-sm text-muted">{precioActual}</s>
                <div className="precioFinal font-black flex justify-between items-center gap-2">
                    {precioFinal}
                    {descuento > 0 && (<small className="text-brand font-black text-xs">{descuento}% OFF</small>)}
                </div>
            </>
        ) :
            precioActual
        }
        </>
    )
}

export default Precio;