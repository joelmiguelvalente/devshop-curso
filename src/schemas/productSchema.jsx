// src/schemas/productSchema.jsx
export const productFieldDefault = {
    title: '',
    price: 0,
    stock: 0,
    description: '',
    excerpt: '',
    category: '',
    discount: '',
    tags: '',
    outstanding: false,
    image: null
};

export const productSchema = {
    title: {
        required: true,
        requiredMessage: 'El título del producto es obligatorio.',
        minLength: 3,
        minLengthMessage: 'Mínimo 3 caracteres.'
    },
    price: {
        required: true,
        isNumber: true,
        min: 0.01,
        minMessage: 'El precio debe ser mayor a 0.'
    },
    stock: {
        required: true,
        isNumber: true,
        isInteger: true, // Asegura que no pongan decimales en el stock
        min: 0,
        minMessage: 'Stock entero >= 0.'
    },
    category: {
        required: true,
        requiredMessage: 'Categoría obligatoria.'
    },
    tags: {
        required: true,
        requiredMessage: 'Agrega al menos una etiqueta.', // Valida strings o arrays vacíos
        validate: (value) => {
            if (typeof value === 'string' && !value.trim()) {
                return 'Agrega al menos una etiqueta.';
            }
            return null;
        }
    },
    excerpt: {
        required: true,
        requiredMessage: 'Extracto obligatorio.'
    },
    description: {
        required: true,
        requiredMessage: 'La descripción es obligatoria.',
        minLength: 10,
        minLengthMessage: 'Mínimo 10 caracteres.'
    },
    discount: {
        // No es requerido porque puede estar vacío, pero si se llena debe ser válido
        isNumber: true,
        min: 0,
        max: 100,
        minMessage: 'Descuento entre 0 y 100.',
        maxMessage: 'Descuento entre 0 y 100.'
    },
    image: {
        required: true,
        requiredMessage: 'Imagen obligatoria.'
    }
    // 'outstanding' no requiere reglas por ser un booleano controlado por checkbox/switch
};