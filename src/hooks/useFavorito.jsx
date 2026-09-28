// src/hooks/useFavoritos.jsx
import { useState, useEffect } from 'react';
import { STORAGE_KEY, obtenerFavoritos } from '@utils/Favoritos';

export function useFavorito(id) {
    const idNumerico = id;

    const [guardado, setGuardado] = useState(() => {
        const favoritos = obtenerFavoritos();
        return favoritos.some(item => item === idNumerico);
    });

    const accionFavorito = () => {
        const favoritos = obtenerFavoritos();
        const favNumb = favoritos.map(String);

        let actualizarFavoritos = guardado ?
            favNumb.filter(item => item !== idNumerico) : [...favNumb, idNumerico];

        localStorage.setItem(STORAGE_KEY, JSON.stringify(actualizarFavoritos));
        setGuardado(!guardado);
        window.dispatchEvent(new Event('local-storage-update'));
    };

    return [guardado, accionFavorito];
}

export default function useFavoritoNavbar() {
    const [listaFavoritos, setListaFavoritos] = useState(() => obtenerFavoritos());

    useEffect(() => {
        const escucharCambios = () => setListaFavoritos(obtenerFavoritos());
        const eventos = ['local-storage-update', 'storage'];
        eventos.forEach(evento => window.addEventListener(evento, escucharCambios));
        return () => eventos.forEach(evento => window.removeEventListener(evento, escucharCambios));
    }, []);

    return {
        favoritos: listaFavoritos,
        favoritosContar: listaFavoritos.length
    };
}