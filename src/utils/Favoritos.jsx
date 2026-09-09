export const STORAGE_KEY = 'mis_favoritos';

export const obtenerFavoritos = () => {
    if (typeof window === 'undefined') return [];
    const guardados = localStorage.getItem(STORAGE_KEY);
    return guardados ? JSON.parse(guardados) : [];
};