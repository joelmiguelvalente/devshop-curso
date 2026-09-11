// /src/components/ui/BtnComprar.jsx
import { useState } from 'react';
import { Alerta } from '@ui/Alerta';

export function BtnComprar({ nombre, cantidad }) {
    const [alerta, setAlerta] = useState({ tipo: '', mensaje: '' });

    const agregarAlCarrito = () => {
        if(cantidad < 1) {
            cantidad++;
        }
        setAlerta({
            tipo: 'success',
            mensaje: `Agregaste ${cantidad} unidades de ${nombre} al carrito.`
        });
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