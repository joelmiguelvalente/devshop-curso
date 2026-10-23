// src/pages/admin/index/CuponesPorVencer.jsx (este si fue por IA)
import { Link } from 'react-router';
import { Clock } from 'lucide-react';
import { Badge } from '@ui/Badge';

const MS_30_DIAS = 30 * 24 * 60 * 60 * 1000;

// Solo cupones que piden acción: vencidos, por vencer (30 días), agotados o inactivos
function estado(cupon) {
    if (!cupon.isActive) return { texto: 'Inactivo', variant: 'surface' };
    if (cupon.usageLimit > 0 && cupon.usageCount >= cupon.usageLimit) {
        return { texto: 'Agotado', variant: 'error' };
    }
    const diff = new Date(cupon.expirationDate).getTime() - Date.now();
    if (diff < 0) return { texto: 'Vencido', variant: 'error' };
    if (diff < MS_30_DIAS) return { texto: 'Por vencer', variant: 'warning' };
    return null;
}

export function CuponesPorVencer({ cupones = [] }) {
    const alertas = cupones
        .map(cupon => ({ cupon, estado: estado(cupon) }))
        .filter(item => item.estado !== null)
        .slice(0, 5);

    return (
        <section className="bg-surface border border-color rounded-lg p-4">
            <h3 className="flex items-center gap-2 text-lg font-bold mb-3">
                <Clock size={20} className="text-warning" aria-hidden="true" />
                Cupones: requieren atención
            </h3>
            {alertas.length === 0 ? (
                <p className="text-success font-medium">Ningún cupón requiere atención.</p>
            ) : (
                <ul className="flex flex-col gap-2">
                    {alertas.map(({ cupon, estado }) => (
                        <li key={cupon.id} className="flex items-center justify-between gap-2">
                            <Link to="/admin/cupones" className="text-brand font-medium">
                                {cupon.code}
                            </Link>
                            <Badge variant={estado.variant}>{estado.texto}</Badge>
                        </li>
                    ))}
                </ul>
            )}
        </section>
    );
}
