// src/schemas/categorySchema.jsx
export const categoryFieldDefault = {
    name: '',
    slug: ''
};

export const categorySchema = {
    name: {
        required: true,
        requiredMessage: 'El nombre de la categoría es obligatorio.',
        minLength: 3,
        minLengthMessage: 'Mínimo 3 caracteres.'
    },
    slug: {
        required: true,
        requiredMessage: 'El slug es obligatorio.',
        pattern: /^[a-z0-9]+(?:-[a-z0-9]+)*$/,
        patternMessage: 'Solo minúsculas, números y guiones (ej: accesorios-gamer).'
    }
};
