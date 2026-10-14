// Inspirado en esquemas declarativos como React-Hook-Form

/**
 * Validador genérico de formularios basado en reglas declarativas.
 * @param   {Object} data - Los datos actuales del formulario (useState).
 * @param   {Object} schema - Las reglas de validación asignadas a cada campo.
 * @returns {Object} Un objeto con los errores detectados { campo: 'mensaje' }.
 */
export const validarFormulario = (data, schema) => {
    const errors = {};

    for (const field in schema) {
        const value = data[field];
        const rules = schema[field];

        // Obligatorio (required)
        if (rules.required) {
            const isEmpty = value === undefined || value === null ||
            (typeof value === 'string' && value.trim() === '') ||
            (Array.isArray(value) && value.length === 0);

            if (isEmpty) {
                errors[field] = rules.requiredMessage || 'Este campo es obligatorio.';
                continue; // Si está vacío y es requerido, pasamos al siguiente campo
            }
        }

        // Si el campo no es requerido y está vacío, ignoramos las demás reglas
        if (value === undefined || value === null || value === '') continue;

        // Longitud mínima de caracteres (minLength)
        if (rules.minLength && typeof value === 'string' && value.trim().length < rules.minLength) {
            errors[field] = rules.minLengthMessage || `Mínimo ${rules.minLength} caracteres.`;
        }

        // Expresión regular / Patrones (pattern)
        if (rules.pattern && !rules.pattern.test(String(value))) {
            errors[field] = rules.patternMessage || 'Formato inválido.';
        }

        // Validaciones numéricas (min / max / integer)
        if (rules.isNumber) {
            const num = Number(value);
            if (isNaN(num)) {
                errors[field] = 'Debe ser un número válido.';
            } else {
                if (rules.min !== undefined && num < rules.min) {
                    errors[field] = rules.minMessage || `Debe ser mayor o igual a ${rules.min}.`;
                }
                if (rules.max !== undefined && num > rules.max) {
                    errors[field] = rules.maxMessage || `Debe ser menor o igual a ${rules.max}.`;
                }
                if (rules.isInteger && !Number.isInteger(num)) {
                    errors[field] = 'Debe ser un número entero.';
                }
            }
        }

        // Función de validación personalizada (custom)
        if (typeof rules.validate === 'function') {
            const customErrorMessage = rules.validate(value, data);
            if (customErrorMessage) {
                errors[field] = customErrorMessage;
            }
        }
    }

    return errors;
};