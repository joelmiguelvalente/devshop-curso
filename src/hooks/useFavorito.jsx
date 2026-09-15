// src/hooks/useFavoritos.jsx
import { useState } from 'react';
import { STORAGE_KEY, obtenerFavoritos } from '@utils/Favoritos';

export function useFavorito(id, nombre) {

    const [guardado, setGuardado] = useState(() => {
        const favoritos = obtenerFavoritos();
        return favoritos.some(item => item === id);
    });

    const accionFavorito = () => {
        const favoritos = obtenerFavoritos();
        let actualizarFavoritos = guardado ? favoritos.filter(item => item !== id) : [...favoritos, id];
        let textoAlerta = guardado ? 'Quitaste' : 'Guardaste';

        localStorage.setItem(STORAGE_KEY, JSON.stringify(actualizarFavoritos));
        setGuardado(!guardado);
        window.dispatchEvent(new Event('local-storage-update'));
    };

    return [guardado, accionFavorito];
}
