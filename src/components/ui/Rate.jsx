// src/components/ui/Rate.jsx
// Libreria
import { Star } from 'lucide-react';
// Utilidad
import { obtenerFormatoShort as Short } from '@utils/CompactNumber';

export const Rate = ({
    rating: { rate: puntos, count: total }
}) => {
    // Si no son numeros, no devolverá nada!
    if(typeof puntos !== 'number' && typeof total !== 'number') {
        return;
    }
    return (
        <p className="rate flex justify-start items-center text-md" aria-label={`Puntuación ${puntos} sobre 5 con ${total} votos`}>
            <Star aria-hidden="true" />
            <strong className="mr-2">
                {puntos.toFixed(1)}
            </strong>
            <span className="text-sm">({Short(total)} votos)</span>
        </p>
    );
}
