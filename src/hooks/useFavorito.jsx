// src/hooks/useFavoritos.jsx
import { useState } from 'react';
import { STORAGE_KEY, obtenerFavoritos } from '@utils/Favoritos';

export function useFavorito(id) {
    const idNumerico = Number(id);

    const [guardado, setGuardado] = useState(() => {
        const favoritos = obtenerFavoritos();
        return favoritos.some(item => Number(item) === idNumerico);
    });

    const accionFavorito = () => {
        const favoritos = obtenerFavoritos();
        const favoritosNumericos = favoritos.map(Number);

        let actualizarFavoritos = guardado ?
            favoritosNumericos.filter(item => item !== idNumerico) :
            [...favoritosNumericos, idNumerico];

        localStorage.setItem(STORAGE_KEY, JSON.stringify(actualizarFavoritos));
        setGuardado(!guardado);
        window.dispatchEvent(new Event('local-storage-update'));
    };

    return [guardado, accionFavorito];
}
