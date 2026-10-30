// src/schemas/profileSchema.jsx
export const profileFieldDefault = {
    name: '',
    avatar: ''
};

// Lo que el usuario puede editar de su propio perfil (rol y email quedan afuera)
export const profileSchema = {
    name: {
        required: true,
        requiredMessage: 'El nombre es obligatorio.',
        minLength: 3,
        minLengthMessage: 'Mínimo 3 caracteres.'
    },
    avatar: {
        required: true,
        requiredMessage: 'La imagen de perfil es obligatoria.'
    }
};

export const passwordFieldDefault = {
    password: ''
};

export const passwordSchema = {
    password: {
        required: true,
        requiredMessage: 'Ingresá la nueva contraseña.',
        minLength: 6,
        minLengthMessage: 'La contraseña debe tener al menos 6 caracteres.'
    }
};
