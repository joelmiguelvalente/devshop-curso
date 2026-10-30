// src/pages/public/Producto/modulos/Resenas.jsx
import { useState } from 'react';
// Libreria
import { Star } from 'lucide-react';
// Seccion
import { ResenaCard } from '@public/Producto/modulos/ResenaCard';

// Reseñas de ejemplo (hardcodeadas hasta tener colección real de reviews)
const RESENAS = [
    {
        id: 'res-1',
        nombre: 'Camila R.',
        fecha: '2 de octubre de 2026',
        puntos: 5,
        titulo: 'Superó mis expectativas',
        texto: 'Lo compré con dudas por el precio y la verdad rinde excelente. El envío llegó en fecha y el producto tal cual la descripción. Lo recomiendo.',
    },
    {
        id: 'res-2',
        nombre: 'Martín G.',
        fecha: '18 de septiembre de 2026',
        puntos: 4,
        titulo: 'Muy bueno, con un detalle',
        texto: 'Buena calidad y funciona perfecto. Le saco una estrella porque la caja vino un poco golpeada, pero el producto intacto. Volvería a comprar.',
    },
    {
        id: 'res-3',
        nombre: 'Sofía L.',
        fecha: '30 de agosto de 2026',
        puntos: 5,
        titulo: 'Atención impecable',
        texto: 'Tuve una duda con la compatibilidad y me respondieron en el día por correo. El producto es tal cual se ve en las fotos. Compra redonda.',
    },
];

const leerVoto = (productId) => {
    try {
        const raw = window.localStorage.getItem(`devshop-voto-${productId}`);
        const n = Number(raw);
        return n >= 1 && n <= 5 ? n : 0;
    } catch {
        return 0;
    }
};

export function Resenas({ productId }) {
    const [miVoto, setMiVoto] = useState(() => leerVoto(productId));

    const votar = (puntos) => {
        setMiVoto(puntos);
        try {
            window.localStorage.setItem(`devshop-voto-${productId}`, String(puntos));
        } catch {
            // Sin almacenamiento: el voto vale solo para la sesión
        }
    };

    return (
        <section className="mt-6 flex justify-start items-start gap-3">
            <div className="w-2/3">
                <div className="text-center mb-4">
                    <h2 className="text-2xl font-bold mb-2">Opiniones de clientes</h2>
                    <span className="badge text-lg badge-success">{RESENAS.length} reseñas</span>
                </div>
                <div className="flex flex-col gap-3">
                    {RESENAS.map(resena => <ResenaCard key={resena.id} resena={resena} />)}
                </div>
            </div>
            <div className="my-4 w-1/3 text-center sticky mt-0" style={{ top: '4.325rem' }}>
                <p className="font-bold mb-3">¿Compraste este producto? ¡Votalo!</p>
                <div className="flex justify-center items-center gap-2">
                    {[1, 2, 3, 4, 5].map(n => (
                        <button
                            key={n}
                            type="button"
                            onClick={() => votar(n)}
                            aria-label={`Votar ${n} de 5 estrellas`}
                            className="p-1 rounded-full focus-ring"
                        >
                            <Star
                                size={24}
                                aria-hidden="true"
                                className={n <= miVoto ? 'text-warning' : 'text-muted'}
                                fill={n <= miVoto ? 'currentColor' : 'none'}
                            />
                        </button>
                    ))}
                </div>
                {miVoto > 0 && (
                    <p className="text-success font-medium mt-3">
                        ¡Gracias por tu voto! Puntuaste {miVoto}/5.
                    </p>
                )}
            </div>
        </section>
    );
}
