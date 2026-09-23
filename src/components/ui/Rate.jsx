// src/components/ui/Rate.jsx
import { Star } from 'lucide-react';
import { obtenerFormatoShort as Short } from '@utils/CompactNumber';

const rounded = number => number.toFixed(1);

const Rate = ({ rating = null }) => {
    const { rate: puntos, count: total } = rating;
    // Texto
    const __total = `${total} votos`;
    const __label =` Puntuación ${puntos} sobre 5 con ${__total}`;
    //
    if(rating !== null) {
        return (
            <p className="rate flex justify-start items-center text-md" aria-label={__label}>
                <Star />
                <strong className="mr-2">
                    {rounded(puntos)}
                </strong>
                <span className="text-sm">({Short(total)} votos)</span>
            </p>
        );
    }
    return;
}

export default Rate;