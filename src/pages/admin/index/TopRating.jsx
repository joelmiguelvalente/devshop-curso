// src/pages/admin/index/TopRating.jsx
import { Link } from 'react-router';
import { Star } from 'lucide-react';
import Rate from '@ui/Rate';

// Los 5 mejor puntuados (solo productos que ya tienen votos)
export function TopRating({ productos = [] }) {
    const top = productos
        .filter(p => p.rating?.rate > 0)
        .sort((a, b) => b.rating.rate - a.rating.rate)
        .slice(0, 5);

    return (
        <section className="bg-surface border border-color rounded-lg p-4">
            <h3 className="flex items-center gap-2 text-lg font-bold mb-3">
                <Star size={20} className="text-warning" aria-hidden="true" />
                Mejor puntuados
            </h3>
            {top.length === 0 ? (
                <p className="text-muted">Todavía no hay productos con votos.</p>
            ) : (
                <ul className="flex flex-col gap-2">
                    {top.map((p, i) => (
                        <li key={p.id} className="flex items-center justify-between gap-2">
                            <span className="flex items-center gap-2">
                                <span className="text-sm font-black text-muted">{i + 1}.</span>
                                <Link to={`/admin/productos/editar/${p.id}`} className="text-brand font-medium">
                                    {p.title}
                                </Link>
                            </span>
                            <Rate rating={p.rating} />
                        </li>
                    ))}
                </ul>
            )}
        </section>
    );
}
