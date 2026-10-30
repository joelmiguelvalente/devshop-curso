// src/components/ui/Modal.jsx
import { useEffect } from 'react';
// Libreria
import { SquareX } from 'lucide-react';
// Componente
import { Button } from '@ui/Button';

export function Modal({ isOpen, onClose, title, children }) {

    useEffect(() => {
        if (isOpen) {
            document.documentElement.classList.add('overflow-y-hidden');
        } else {
            document.documentElement.classList.remove('overflow-y-hidden');
        }
        return () => document.documentElement.classList.remove('overflow-y-hidden');
    }, [isOpen]);

    if (!isOpen) return null;

    return (
        // Contenedor fijo que cubre toda la pantalla encima de todo
        <div className="fixed w-full hd-screen flex items-center justify-center z-full p-4" style={{ inset: '0' }}>
            <div
                className="absolute top-0 left-0 w-full h-full backdrop-filter transition"
                onClick={onClose}
            />
            <div
                className="relative bg-surface border border-color rounded-lg shadow-lg w-full md:w-1/2 transition"
                style={{ maxWidth: '500px' }}
                role="dialog"
                aria-modal="true"
            >
                <div className="flex justify-between items-center p-3">
                    <h2 className="text-xl font-bold m-0">{title}</h2>
                    <SquareX onClick={onClose} />
                </div>
                {children}
            </div>
        </div>
    );
}

export function ModalContent({ children }) {
    return <div className="text-base text-secondary">{children}</div>;
}

export function ModalButtons({ children }) {
    return <div className="flex justify-start flex-row-reverse gap-3 border-t border-1 border-color p-3">{children}</div>;
}

export function ModalCancel({ children, onClick, value, variant = 'ghost' }) {
    return <Button onClick={onClick} variant={variant}>{children ?? value}</Button>;
}

export function ModalConfirm({ children, onClick, value, variant = 'ghost' }) {
    return <Button onClick={onClick} variant={variant} cx="cursor-pointer transition">{children ?? value}</Button>;
}