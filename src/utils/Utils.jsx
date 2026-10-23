export const cn = (...inputs) => {
    return inputs.flat(Infinity).filter(Boolean).map(item => {
        if (typeof item === 'object') {
            return Object.entries(item).filter(([, value]) => Boolean(value)).map(([key]) => key).join(' ');
        }
        return item;
    }).join(' ').trim().replace(/\s+/g, ' ');
}

export const normalizeTags = (data) => {
    if(typeof data.tags === 'string') {
        const tags = data.tags.split(/\s*,\s*/);
        tags.map(item =>
            item.toLowerCase()
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "")
            .replace(/[^a-z0-9\s-]/g, "")
            .replace(/\s+/g, "-")
            .trim()
        ).filter(Boolean);
    }
    return [];
}

export const alwaysUpper = string => string.toUpperCase().trim();

// "Accesorios Gamer Ñ" → "accesorios-gamer-n"
export const slugify = (string) =>
    (string ?? '')
        .toString()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9\s-]/g, '')
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-')
        .replace(/^-+|-+$/g, '');

// Convierte timestamps de Firebase a string YYYY-MM-DD para los inputs HTML
export const formatDate = (fecha) => {
    if (!fecha) return '';
    const d = fecha.toDate ? fecha.toDate() : new Date(fecha);
    return d.toISOString().split('T')[0];
};

export function getCouponStatus(startDate, expirationDate) {
    const now = new Date();
    // Convertir los parámetros a objetos Date de JavaScript nativos si vienen de Firestore
    const start = startDate?.toDate ? startDate.toDate() : new Date(startDate);
    const expire = expirationDate?.toDate ? expirationDate.toDate() : new Date(expirationDate);
    // Validar si aún no ha comenzado la validez del cupón
    if (now < start) return 'Próximamente';
    // Validar si ya expiró
    if (now > expire) return 'Expirado';
    // Calcular la diferencia en milisegundos
    const diffInMs = expire - now;

    const diffInMinutes = Math.floor(diffInMs / (1000 * 60));
    const diffInHours   = Math.floor(diffInMs / (1000 * 60 * 60));
    const diffInDays    = Math.floor(diffInMs / (1000 * 60 * 60 * 24));
    const diffInMonths  = Math.floor(diffInDays / 30);

    // 4. Retornar el texto según la urgencia del tiempo restante
    if (diffInMonths > 0)   return `Quedan ${diffInMonths} ${diffInMonths === 1 ? 'mes' : 'meses'}`;
    if (diffInDays > 0)     return `Quedan ${diffInDays} ${diffInDays === 1 ? 'día' : 'días'}`;
    if (diffInHours > 0)    return `Quedan ${diffInHours} hs`;
    if (diffInMinutes > 0)  return `Quedan ${diffInMinutes} min`;
    return 'Expirará pronto';
}