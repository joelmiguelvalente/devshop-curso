// src/components/ui/ModalEliminar.jsx
// Componente
import { Modal, ModalContent, ModalButtons, ModalCancel, ModalConfirm } from '@ui/Modal';

export function ModalEliminar({
    abierto,
    onCerrar,
    onConfirmar,
    singular = 'registro',
    mensaje = `¿Estás seguro de que deseas eliminar a este ${singular} del sistema?`
}) {
    return (
        <Modal isOpen={abierto} onClose={onCerrar} title={`¿Eliminar ${singular} definitivamente?`}>
            <ModalContent>
                <p className="text-error font-semibold bg-error p-2 text-sm">
                    ⚠️ Esta acción es irreversible y se borrarán todos sus registros permanentemente.
                </p>
                <p className="p-3">{mensaje}</p>
            </ModalContent>
            <ModalButtons>
                <ModalCancel onClick={onCerrar}>Cancelar</ModalCancel>
                <ModalConfirm onClick={onConfirmar} variant="error" value={`Sí, eliminar ${singular}`} />
            </ModalButtons>
        </Modal>
    );
}