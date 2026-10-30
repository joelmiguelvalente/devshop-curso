// src/schemas/couponSchema.jsx
export const couponFieldDefault = {
    code: '',
    title: '',
    description: '',
    discountType: '',
    discountValue: 0,
    minOrderAmount: 0,
    maxDiscountAmount: 0,
    startDate: '',
    expirationDate: '',
    usageLimit: 0,
    usageCount: 0,
    perUserLimit: 0,
    isActive: false
};

export const couponSchema = {
    code: {
        required: true,
        requiredMessage: 'El código del cupón es obligatorio.',
        minLength: 4,
        minLengthMessage: 'El código debe tener al menos 4 caracteres.',
        pattern: /^[A-Z0-9_-]+$/,
        patternMessage: 'Solo se permiten letras mayúsculas, números, guiones y guiones bajos.'
    },
    title: {
        required: true,
        requiredMessage: 'El título visible del cupón es requerido.',
        minLength: 3,
        minLengthMessage: 'El título debe tener al menos 3 caracteres.'
    },
    description: {
        required: true,
        requiredMessage: 'La descripción del cupón es obligatoria.'
    },
    discountType: {
        required: true,
        requiredMessage: 'Debes seleccionar el tipo de descuento (porcentaje o monto fijo).'
    },
    discountValue: {
        required: true,
        isNumber: true,
        min: 0.01,
        minMessage: 'El valor del descuento debe ser mayor a 0.',
        // Validación personalizada para asegurar que si es porcentaje no pase de 100
        validate: (value, allData) => {
            if (allData.discountType === 'percentage' && Number(value) > 100) {
                return 'El porcentaje de descuento no puede ser mayor al 100%.';
            }
            return null;
        }
    },
    minOrderAmount: {
        isNumber: true,
        min: 0,
        minMessage: 'El monto mínimo de compra no puede ser negativo.'
    },
    maxDiscountAmount: {
        isNumber: true,
        min: 0,
        minMessage: 'El tope máximo de descuento no puede ser negativo.',
        // Validación condicional: Obligatorio si el descuento es porcentual
        validate: (value, allData) => {
            if (allData.discountType === 'percentage' && (!value || Number(value) <= 0)) {
                return 'Para descuentos de porcentaje es recomendable asignar un tope máximo mayor a 0.';
            }
            return null;
        }
    },
    startDate: {
        required: true,
        requiredMessage: 'La fecha de inicio es obligatoria.'
    },
    expirationDate: {
        required: true,
        requiredMessage: 'La fecha de vencimiento es obligatoria.',
        // Validación personalizada cruzada: La fecha de vencimiento debe ser posterior a la de inicio
        validate: (value, allData) => {
            if (!allData.startDate) return null;
            const inicio = new Date(allData.startDate).getTime();
            const fin = new Date(value).getTime();
            if (fin <= inicio) {
                return 'La fecha de vencimiento debe ser posterior a la fecha de inicio.';
            }
            return null;
        }
    },
    usageLimit: {
        required: true,
        isNumber: true,
        isInteger: true,
        min: 1,
        minMessage: 'El límite total de usos debe ser al menos 1.',
        requiredMessage: 'Debes definir cuántas veces se puede usar el cupón en total.'
    },
    perUserLimit: {
        required: true,
        isNumber: true,
        isInteger: true,
        min: 1,
        minMessage: 'El límite por usuario debe ser al menos 1.',
        requiredMessage: 'Debes definir cuántas veces puede usarlo cada cliente individual.'
    }
    // Nota: 'usageCount' no se valida porque empieza en 0 de forma automática en el backend.
    // 'isActive' tampoco requiere validación ya que es un booleano controlado por un checkbox/switch.
};
