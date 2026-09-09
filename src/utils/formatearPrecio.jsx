export function FormatearPrecio(precio, descuento) {

    // Formateamos el precio de 100000 a 100.000
    const formatoPrecio = new Intl.NumberFormat('es-AR', {
        style: 'currency',
        currency: 'ARS',
        maximumFractionDigits: 0,
    });

    const precioFinal = precio * (1 - descuento / 100);

    return {
        precioFinal: formatoPrecio.format(precioFinal),
        precioActual: formatoPrecio.format(precio)
    }
}