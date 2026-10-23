// src/pages/admin/index/PorCategoria.jsx
import { BarChart3 } from 'lucide-react';

// Conteo de productos por categoría con barras CSS puras
export function PorCategoria({ productos = [] }) {
    const conteo = productos.reduce((acc, p) => {
        const categoria = p.category || 'Sin categoría';
        acc[categoria] = (acc[categoria] || 0) + 1;
        return acc;
    }, {});
    const filas = Object.entries(conteo)
        .sort(([, a], [, b]) => b - a)
        .slice(0, 6);
    const maximo = filas.length > 0 ? filas[0][1] : 0;

    return (
        <section className="bg-surface border border-color rounded-lg p-4">
            <h3 className="flex items-center gap-2 text-lg font-bold mb-3">
                <BarChart3 size={20} className="text-brand" aria-hidden="true" />
                Productos por categoría
            </h3>
            {filas.length === 0 ? (
                <p className="text-muted">Todavía no hay productos.</p>
            ) : (
                <ul className="flex flex-col gap-2">
                    {filas.map(([categoria, total]) => (
                        <li key={categoria} className="flex items-center gap-3">
                            <span className="text-sm font-medium text-capitalize shrink-0" style={{ minWidth: '7rem' }}>
                                {categoria}
                            </span>
                            <span className="grow-1 bg-secondary rounded-full overflow-hidden" style={{ height: '0.5rem' }} role="presentation">
                                <span
                                    className="block bg-brand rounded-full"
                                    style={{ width: `${maximo > 0 ? Math.round((total / maximo) * 100) : 0}%`, height: '100%' }}
                                />
                            </span>
                            <span className="text-sm font-black shrink-0">{total}</span>
                        </li>
                    ))}
                </ul>
            )}
        </section>
    );
}
