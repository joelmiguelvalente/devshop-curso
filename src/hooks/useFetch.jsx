// src/hooks/useFetch.jsx
import { useState, useEffect, useCallback } from 'react';

export function useFetchData(fetcher, clave, { inicial = null } = {}) {
    const [datos, setDatos] = useState(inicial);
    const [error, setError] = useState(null);
    const [cargando, setCargando] = useState(true);
    const [tick, setTick] = useState(0);

    useEffect(() => {
        let activo = true;

        const realizarFetch = async () => {
            setCargando(true);
            setError(null);
            try {
                const resultado = await fetcher();
                if (activo) setDatos(resultado);
            } catch (err) {
                if (activo) setError(err.message || 'No se pudieron cargar los datos');
            } finally {
                if (activo) setCargando(false);
            }
        };

        realizarFetch();

        return () => {
            activo = false;
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [clave, tick]);

    const recargar = useCallback(() => setTick((t) => t + 1), []);

    return { datos, error, cargando, recargar };
}