// /src/components/ui/Precio.jsx
// Componente
import { Badge } from '@ui/Badge';
// Utilidad
import { obtenerPrecio, obtenerDescuento } from '@utils/CompactNumber';

// Mapeo con strings literales completos para que PurgeCSS detecte las clases.
const priceSizeClasses = {
    xs: 'text-xs',
    sm: 'text-sm',
    base: 'text-base',
    md: 'text-md',
    lg: 'text-lg',
    xl: 'text-xl',
    '2xl': 'text-2xl',
    '3xl': 'text-3xl',
    '4xl': 'text-4xl',
};

function StylePrice({ price, discount, size }) {
    const sizeClass = priceSizeClasses[size] ?? 'text-2xl';
    return (
        <div className="flex justify-between items-center gap-2">
            <div className={`precioFinal ${sizeClass} font-black`}>
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