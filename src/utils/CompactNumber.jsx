// Formateamos el precio de 100000 a 100.000
const Currency = new Intl.NumberFormat('es-AR', {
    style: 'currency',
    currency: 'ARS',
    maximumFractionDigits: 0,
});

const Formatted = new Intl.NumberFormat('es-AR', {
    notation: 'compact',
    compactDisplay: 'short'
});

export function obtenerFormatoShort(number = 0) {
    return Formatted.format(number);
}

export function obtenerSubtotal(price = 0, quantity = 0) {
    return Currency.format(price * quantity);
}

export function obtenerPrecio(price = 0) {
    return Currency.format(price);
}

export function obtenerDescuento(price = 0, discount = 0) {
    return Currency.format(price * (1 - discount / 100));
}