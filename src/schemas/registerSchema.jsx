// src/schemas/registerSchema.jsx
export const registerFieldDefault = {
    name: '',
    email: '',
    password: '',
    confirm: '',
    label: 'Novato'
};

export const registerSchema = {
    name: {
        required: true,
        requiredMessage: 'El nickname es obligatorio.',
        minLength: 3,
        minLengthMessage: 'Mínimo 3 caracteres.'
    },
    email: {
        required: true,
        requiredMessage: 'El correo electrónico es requerido.',
        pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        patternMessage: 'Email inválido.'
    },
    password: {
        required: true,
        requiredMessage: 'La contraseña es requerida.',
        minLength: 6,
        minLengthMessage: 'La contraseña debe tener al menos 6 caracteres.'
    },
    confirm: {
        required: true,
        requiredMessage: 'Confirmá tu contraseña.',
        // Validación cruzada: coincide con el password
        validate: (value, allData) =>
            value === allData.password ? null : 'Las contraseñas no coinciden.'
    }
    // 'avatar' no se valida: se genera solo con DiceBear al crear la cuenta
};
