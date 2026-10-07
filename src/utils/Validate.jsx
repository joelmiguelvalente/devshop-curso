const validarNumbers = (price, stock, discount) => {
    const e = {};
    // Validar precio
    if (Number(price) <= 0)
        e.price = 'El precio debe ser mayor a 0.';
    // Validar stock
    if (Number(stock) < 0 || !Number.isInteger(Number(stock)))
        e.stock = 'Stock entero >= 0.';
    // Validar descuento
    if (discount !== '' && (Number(discount) < 0 || Number(discount) > 100))
        e.discount = 'Descuento entre 0 y 100.';
    return e;
}

export const validarInputsProductos = (d) => {
    const e = {};
    const n = validarNumbers(d.price, d.stock, d.discount);
    // Validar titulo
    if (!d.title?.trim() || d.title.trim().length < 3) e.title = 'Mínimo 3 caracteres.';
    // Validar categoria
    if (!d.category) e.category = 'Categoría obligatoria.';
    // Validar tags
    if (!d.tags?.trim()) e.tags = 'Agrega al menos una etiqueta.';
    // Validar excerpt
    if (!d.excerpt?.trim()) e.excerpt = 'Extracto obligatorio.';
    // Validar descripcion
    if (!d.description?.trim() || d.description.trim().length < 10) e.description = 'Mínimo 10 caracteres.';
    // Validar image
    if (!d.image) e.image = 'Imagen obligatoria.';
    return {...e, ...n};
};

export const validarInputsUsuarios = (d) => {
    const e = {};
    if (!d.name?.trim() || d.name.trim().length < 3) e.name = 'Mínimo 3 caracteres.';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(d.email ?? '')) e.email = 'Email inválido.';
    if (!d.role?.trim()) e.role = 'Rol obligatorio.';
    return e;
};