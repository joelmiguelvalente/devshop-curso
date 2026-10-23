// src/utils/rhfResolver.jsx
import { validarFormulario as validate } from '@utils/Validate';

export const createSchemaResolver = (schema) => async (data) => {
    const errors = validate(data, schema);
    return {
        values: data,
        errors: Object.fromEntries(
            Object.entries(errors)
                .filter(([, message]) => message)
                .map(([campo, message]) => [campo, { type: 'manual', message }])
        ),
    };
};