export const loginFieldDefault = {
    email: '',
    password: ''
};

export const loginSchema = {
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
    }
};
