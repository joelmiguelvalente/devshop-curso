// /src/components/ui/BtnComprar.jsx
import { useState } from 'react';
import { Alerta } from '@ui/Alerta';

export function BtnComprar({ nombre, cantidad }) {
    const [alerta, setAlerta] = useState({ tipo: '', mensaje: '' });

    const agregarAlCarrito = () => {
        let estado = (cantidad <= 0);
        let tipo = estado ? 'error' : 'success';
        let mensaje = estado ? `Tienes poner la cantidad, antes de comprar.` : `Agregaste ${cantidad} unidades de ${nombre} al carrito.`;
        setAlerta({ tipo, mensaje });
    }

    return (
        <>
            {alerta.mensaje && (
                <div className="mb-3">
                    <Alerta
                        type={alerta.tipo}
                        message={alerta.mensaje}
                        onClose={() => setAlerta({ tipo: '', mensaje: '' })}
                    />
                </div>
            )}
            <button className="al-carrito rounded-2 font-medium text-uppercase text-lg" onClick={agregarAlCarrito} type="button">Comprar</button>
        </>
    )
}