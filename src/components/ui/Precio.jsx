// /src/components/ui/Precio.jsx
import { obtenerPrecio, obtenerDescuento } from '@utils/CompactNumber';
import { Badge } from '@ui/Badge';

function StylePrice({ price, discount, size }) {
    return (
        <div className="flex justify-between items-center gap-2">
            <div className={`precioFinal text-${size} font-black`}>
                {price}
            </div>
            {discount !== undefined ? <Badge content={`${discount}% OFF`} size="xs" /> : ''}
        </div>
    )
}

function Precio({ price, discount, size = '2xl' }) {

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

export default Precio;