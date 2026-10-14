export const userFieldDefault = {
    name: '',
    email: '',
    role: '',
    avatar: null,
    staff: false
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
    role: {
        required: true,
        requiredMessage: 'El rol es obligatorio.'
    },
    avatar: {
        required: true,
        requiredMessage: 'El avatar o imagen de perfil es obligatoria.'
    }
    // 'staff' no requiere reglas de validación por ser un booleano (true/false)
};