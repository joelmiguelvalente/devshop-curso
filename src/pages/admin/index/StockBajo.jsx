// src/pages/admin/index/StockBajo.jsx
import { Link } from 'react-router';
import { TriangleAlert } from 'lucide-react';
import { Badge } from '@ui/Badge';

// Productos con 5 unidades o menos (incluye agotados), ordenados por urgencia
export function StockBajo({ productos = [] }) {
    const criticos = productos
        .filter(p => (p.stock ?? 0) <= 5)
        .sort((a, b) => (a.stock ?? 0) - (b.stock ?? 0))
        .slice(0, 5);

    return (
        <section className="bg-surface border border-color rounded-lg p-4">
            <h3 className="flex items-center gap-2 text-lg font-bold mb-3">
                <TriangleAlert size={20} className="text-warning" aria-hidden="true" />
                Stock bajo
            </h3>
            {criticos.length === 0 ? (
                <p className="text-success font-medium">Todo el stock está en niveles sanos.</p>
            ) : (
                <ul className="flex flex-col gap-2">
                    {criticos.map(p => (
                        <li key={p.id} className="flex items-center justify-between gap-2">
                            <Link to={`/admin/productos/editar/${p.id}`} className="text-brand font-medium">
                                {p.title}
                            </Link>
                            {(p.stock ?? 0) === 0 ? (
                                <Badge variant="error">Agotado</Badge>
                            ) : (
                                <Badge variant="warning">¡Solo {p.stock}!</Badge>
                            )}
                        </li>
                    ))}
                </ul>
            )}
        </section>
    );
}
