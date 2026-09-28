import { useEffect } from 'react';
import { CircleCheck, CircleX, TriangleAlert, Info, X } from 'lucide-react';

// obtener emoji tecla Win + . "verificación"
const config = {
    success: <CircleCheck aria-hidden="true" />,
    error:   <CircleX aria-hidden="true" />,
    warning: <TriangleAlert aria-hidden="true" />,
    info:    <Info aria-hidden="true" />
};

export function Alerta({
    type = 'info', // 'success', 'error', 'warning', 'info'
    message,
    onClose,
    duration = 4000
}) {

    useEffect(() => {
        if (!message || !onClose || duration <= 0) return;
        // Agregando auto-cerrado
        const tiempo = setTimeout(onClose, duration);
        return () => clearTimeout(tiempo);
    }, [message, onClose, duration]);

    if (!message) return null;

    // Si falla el primero, tendrá como respaldo el 'info'
    const icon = config[type] || config.info;
    const cx = (type !== '') ? type : 'info';

    return (
        <div
            className={`flex items-center justify-between p-3 border border-1 rounded-3 shadow-sm transition ease-in-out fixed bottom-1 right-1 z-2 bg-${cx} border-${cx} text-${cx}`}
            role="alert"
        >
            <div className="flex items-center gap-3">
                <span className="text-xl shrink-0" aria-hidden="true">{icon}</span>
                <p className="font-medium text-base m-0 text-wrap">{message}</p>
            </div>

            {onClose && (
                <button
                    onClick={onClose}
                    className="ml-3 p-1 rounded-full text-current opacity-6 bg-primary-hover transition cursor-pointer flex items-center justify-center"
                    style={{ width: '24px', height: '24px', background: 'transparent' }}
                    aria-label="Cerrar alerta"
                >
                    <X />
                </button>
            )}
        </div>
    );
}
