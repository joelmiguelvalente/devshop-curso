import { useState } from 'react';
import { destroyDoc } from '@services/firestore.service';

/**
 * Flujo "¿Eliminar...?" compartido por los listados del admin.
 */
export function useEliminar({ coleccion, singular, onEliminado }) {
    const [abierto, setAbierto] = useState(false);
    const [id, setId] = useState(null);

    const abrir = (idAEliminar) => {
        setId(idAEliminar);
        setAbierto(true);
    };

    const cerrar = () => {
        setAbierto(false);
        setId(null);
    };

    const confirmar = async () => {
        if (!id) return;
        try {
            await destroyDoc(coleccion, id);
            onEliminado?.(id);
        } catch (err) {
            console.error(`Error al intentar eliminar el ${singular}:`, err);
        } finally {
            cerrar();
        }
    };

    return {
        abrir,
        modalEliminar: { abierto, onCerrar: cerrar, onConfirmar: confirmar, singular }
    };
}