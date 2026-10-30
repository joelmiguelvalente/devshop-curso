// src/hooks/useFavoritos.jsx
import { useState, useEffect } from 'react';
// Utilidad
import { obtener, guardar } from '@utils/Storage';

export function useFavorito(id) {
    const idNumerico = id;

    const [guardado, setGuardado] = useState(() => {
        const favoritos = obtener('favoritos');
        return favoritos.some(item => item === idNumerico);
    });

    const accionFavorito = () => {
        const favoritos = obtener('favoritos');
        const object = favoritos.map(String);

        let actualizarFavoritos = guardado ?
            object.filter(item => item !== idNumerico) : [...object, idNumerico];

        guardar('favoritos', actualizarFavoritos);
        setGuardado(!guardado);
        window.dispatchEvent(new Event('local-storage-update'));
    };

    return [guardado, accionFavorito];
}

export function useFavoritoNavbar() {
    const [listaFavoritos, setListaFavoritos] = useState(() => obtener('favoritos'));

    useEffect(() => {
        const escucharCambios = () => setListaFavoritos(obtener('favoritos'));
        const eventos = ['local-storage-update', 'storage'];
        eventos.forEach(evento => window.addEventListener(evento, escucharCambios));
        return () => eventos.forEach(evento => window.removeEventListener(evento, escucharCambios));
    }, []);

    return {
        favoritos: listaFavoritos,
        favoritosContar: listaFavoritos.length
    };
}

export function useFavoritosMostrar(datos) {
    const { favoritos } = useFavoritoNavbar();
    const setFavoritos = new Set(favoritos);
    return datos?.filter(producto => setFavoritos.has(producto.id));
}