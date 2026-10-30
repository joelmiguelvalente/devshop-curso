// src/pages/public/Producto/modulos/ResenaCard.jsx
// Libreria
import { Star } from 'lucide-react';

// Estrellas solo lectura (para las reseñas)
function Estrellas({ puntos = 0, size = 16 }) {
    return (
        <span className="flex items-center gap-1" role="img" aria-label={`${puntos} de 5 estrellas`}>
            {[1, 2, 3, 4, 5].map(n => (
                <Star
                    key={n}
                    size={size}
                    aria-hidden="true"
                    className={n <= puntos ? 'text-warning' : 'text-muted'}
                    fill={n <= puntos ? 'currentColor' : 'none'}
                />
            ))}
        </span>
    );
}

export function ResenaCard({ resena }) {
    const { nombre, fecha, puntos, titulo, texto } = resena;

    return (
        <article className="bg-surface border border-color rounded-lg p-4 flex flex-col gap-2">
            <div className="flex items-center gap-3">
                <span
                    className="bg-brand text-brand-foreground rounded-full font-bold flex items-center justify-center shrink-0 w-48 h-48"
                    aria-hidden="true"
                >
                    {nombre.charAt(0)}
                </span>
                <div>
                    <p className="font-bold">{nombre}</p>
                    <p className="text-sm text-muted">{fecha}</p>
                </div>
                <span className="grow-1" />
                <Estrellas puntos={puntos} />
            </div>
            <h3 className="text-base font-bold">{titulo}</h3>
            <p className="text-muted">{texto}</p>
        </article>
    );
}