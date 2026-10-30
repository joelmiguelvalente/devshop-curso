// /src/components/ui/Precio.jsx
// Componente
import { Badge } from '@ui/Badge';
// Utilidad
import { obtenerPrecio, obtenerDescuento } from '@utils/CompactNumber';

function StylePrice({ price, discount, size }) {
    return (
        <div className="flex justify-between items-center gap-2">
            <div className={`precioFinal text-${size} font-black`}>
                {price}
            </div>
            {discount !== undefined ? <Badge content={`${discount}% OFF`} size="sm" variant="success" /> : ''}
        </div>
    )
}

export function Precio({ price, discount, size = '2xl' }) {

    const precio = obtenerPrecio(price);
    const descuentoFinal = obtenerDescuento(price, discount);

    const conDescuento = (discount, descuentoFinal, precio) => {
        if(discount > 0) {
            return (
                <>
                    <s className="block font-italic font-medium text-sm text-muted">{precio}</s>
                    <StylePrice price={descuentoFinal} discount={discount} size={size} />
                </>
            )
        }
        return <StylePrice price={precio} size={size} />
    }

    return conDescuento(discount, descuentoFinal, precio);
}