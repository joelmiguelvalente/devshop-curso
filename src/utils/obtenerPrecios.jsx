// Formateamos el precio de 100000 a 100.000
const Currency = new Intl.NumberFormat('es-AR', {
    style: 'currency',
    currency: 'ARS',
    maximumFractionDigits: 0,
});

export function obtenerSubtotal(precio, cantidad = 0) {
    return Currency.format(precio * cantidad);
}

export function obtenerPrecio(precio) {
    return Currency.format(precio);
}

export function obtenerDescuento(precio, descuento = 0) {
    return Currency.format(precio * (1 - descuento / 100));
}