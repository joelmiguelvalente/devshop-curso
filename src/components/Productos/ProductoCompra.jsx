// /src/components/Productos/ProductoCompra.jsx
import { useState } from 'react';
import { useCounter } from '@hooks/useCounter';
import { useFavorito } from '@hooks/useFavorito';
import { BtnComprar } from '@ui/BtnComprar';
import { Alerta } from '@ui/Alerta';
import { useCart } from '@hooks/useCart';

function Contador(stock) {
	const { cantidad, incrementar, decrementar } = useCounter(stock > 0 ? 1 : 0, stock);
	const sinStock = stock <= 0;
	return (
		<>
			<div className="flex justify-center items-center gap-2" aria-label={`Cantidad seleccionada: ${cantidad}`}>
				<button className="rounded-2 text-lg" onClick={decrementar} disabled={sinStock || cantidad <= 0} type="button" aria-label="Quitar una unidad">−</button>
				<span className="font-bold" aria-live="polite">{cantidad}</span>
				<button className="rounded-2 text-lg" onClick={incrementar} disabled={sinStock || cantidad >= stock} type="button" aria-label="Agregar una unidad">+</button>
			</div>
		</>
	)
}

export function Comprar({ id, nombre, precio, stock = 0 }) {
	const nombreFinal = nombre ?? 'Producto';
	const precioFinal = precio ?? 0;

	const { cantidad } = useCounter(stock > 0 ? 1 : 0, stock);
	const [favorito, setFavorito] = useFavorito(id, nombreFinal);
	const { addToCart } = useCart();
	const [alerta, setAlerta] = useState({ tipo: '', mensaje: '' });

	const sinStock = stock <= 0;

	const handleFavorito = () => {
		setFavorito();
		let chTxt = (!favorito ? 'Agregaste' : 'Quitaste');
		setAlerta({
			tipo: (!favorito ? 'success' : 'error'),
			mensaje: `${chTxt} ${nombre} de favoritos.`
		});
	};

	const handleAddToCart = () => {
		if (sinStock) {
			setAlerta({ tipo: 'warning', mensaje: `${nombreFinal} no tiene stock disponible.` });
			return;
		}
		if (cantidad <= 0) {
			setAlerta({ tipo: 'warning', mensaje: `Seleccioná al menos 1 unidad de ${nombreFinal}.` });
			return;
		}
		addToCart({ id, title: nombreFinal, price: precioFinal }, cantidad);
		setAlerta({ tipo: 'success', mensaje: `Agregaste ${cantidad} ${cantidad === 1 ? 'unidad' : 'unidades'} de ${nombreFinal} al carrito.` });
	};

	return (
		<>
			{alerta.mensaje && (
				<Alerta
					type={alerta.tipo}
					message={alerta.mensaje}
					onClose={() => setAlerta({ tipo: '', mensaje: '' })}
				/>
			)}
			<div className="buttons w-full flex justify-center items-center gap-3 mt-3">
				<Contador stock={stock} />
				<BtnComprar onClick={handleAddToCart} disabled={sinStock} />
				<button aria-label={favorito ? 'Quitar de favoritos' : 'Añadir a favoritos'} className="agregar-favorito rounded-2 text-lg" onClick={handleFavorito} type="button">
					{/* Emojis obtenidos desde: https://emojipedia.org/ */}
					{favorito ? '💔' : '💖'}
				</button>
			</div>
		</>
	);
}