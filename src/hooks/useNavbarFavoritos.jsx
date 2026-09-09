// src/components/hooks/useNavbarFavoritos.jsx
import { useState, useEffect } from 'react';
import { obtenerFavoritos } from '@utils/Favoritos';

export default function useNavbarFavoritos() {
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