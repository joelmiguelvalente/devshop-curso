const AUTH_ERRORS = {
    // para Logueo
    'auth/invalid-credential': 'Correo o contraseña incorrectos.',
    'auth/missing-password': 'Ingresá tu contraseña.',
    // para Registro
    'auth/email-already-in-use': 'Este correo ya está registrado con otra cuenta.',
    'auth/weak-password': 'La contraseña debe tener al menos 6 caracteres.',
    'auth/missing-email': 'Falta ingresar la dirección de correo.',
    // Ambos
    'auth/network-request-failed': 'Sin conexión con el servidor. Revisá tu red.',
    'auth/too-many-requests': 'Demasiados intentos. Esperá unos minutos y probá de nuevo.',
    'auth/invalid-email': 'El formato del correo no es válido.',
};

// Mensajes amigables para los errores más comunes de Firebase Auth
// Función helper para usarlo en tu catch:
export const mensajeAmigable = (errorCode) => {
    return AUTH_ERRORS[errorCode] || 'Ocurrió un error inesperado. Intentá de nuevo.';
};
