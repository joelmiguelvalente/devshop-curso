// Con esto evito hacer duplicación de bloques
import { useState, useEffect } from 'react';

export function useFetch(url) {

    const [datos, setDatos] = useState(null);
    const [error, setError] = useState(null);
    const [cargando, setCargando] = useState(true);

    useEffect(() => {
        let activo = true;
        // reseteamos por si la url cambia y el hook se reusa
        const realizarFetch = async () => {
            try {
                const respuesta = await fetch(url);
                if (!respuesta.ok) {
                    throw new Error(`No se pudo cargar la información (${url})`);
                }
                const json = await respuesta.json();
                if (activo) setDatos(json);
            } catch (error) {
                if (activo) setError(error.message);
            } finally {
                if (activo) setCargando(false);
            }
        }
        realizarFetch();
        // Retornamos
        return () => {
            activo = false;
            setCargando(true);
            setError(null);
        };
    }, [url]);

    return { datos, error, cargando };
}