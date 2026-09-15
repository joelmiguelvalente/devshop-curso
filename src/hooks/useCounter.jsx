import { useState } from 'react';

export function useCounter(valorInicial = 0, stockInicial = 0) {
    const [cantidad, setCantidad] = useState(valorInicial);
    const stocked = stockInicial - cantidad;
    // Aumentamos
    const incrementar = () => {
        if (cantidad < stockInicial) {
            setCantidad(cantidad => cantidad + 1);
        }
    };
    // Decrementamos
    const decrementar = () => {
        if (cantidad > 0) {
            setCantidad(cantidad => cantidad - 1);
        }
    };

    return { cantidad, stocked, incrementar, decrementar };
}

