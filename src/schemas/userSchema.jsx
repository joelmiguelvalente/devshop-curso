export const userFieldDefault = {
    name: '',
    email: '',
    rol: '',
    avatar: null,
    label: ''
};

export const userSchema = {
    name: {
        required: true,
        requiredMessage: 'El nombre del usuario es obligatorio.',
        minLength: 3,
        minLengthMessage: 'Mínimo 3 caracteres.'
    },
    email: {
        required: true,
        requiredMessage: 'El correo electrónico es requerido.',
        pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        patternMessage: 'Email inválido.'
    },
    rol: {
        required: true,
        requiredMessage: 'El rol del usuario es obligatorio.',
        minLength: 3,
        minLengthMessage: 'Mínimo 3 caracteres.'
    },
    label: {
        required: true,
        requiredMessage: 'El label del usuario es obligatorio.',
        minLength: 3,
        minLengthMessage: 'Mínimo 3 caracteres.'
    },
    avatar: {
        required: true,
        requiredMessage: 'El avatar o imagen de perfil es obligatoria.'
    }
};