// src/hook/useUpload.jsx
import { useState, useCallback } from 'react';

export function useUpload() {
    const [cargando, setCargando] = useState(false);
    const [error, setError] = useState(null);
    const [imagen, setImagen] = useState(null);

    const uploadImage = useCallback(async (file) => {
        if (!file) return null;
        setCargando(true);
        setError(null);
        try {
            const apiKey = import.meta.env.VITE_API_KEY;
            const formData = new FormData();
            formData.append('image', file);
            const respuesta = await fetch(`https://api.imgbb.com/1/upload?key=${apiKey}`, {
                method: 'POST',
                body: formData,
            });
            if (!respuesta.ok) throw new Error('Error al subir la imagen a ImgBB');
            const result = await respuesta.json();
            if (!result.success) throw new Error('La subida de la imagen a ImgBB falló.');
            setImagen(result.data.display_url);
            return result.data.display_url;
        } catch (err) {
            setError(err.message || 'Ocurrió un error inesperado');
            return null;
        } finally {
            setCargando(false);
        }
    }, []);

    const limpiar = useCallback(() => {
        setImagen(null);
        setError(null);
    }, []);

    return { uploadImage, cargando, error, imagen, limpiar };
}
