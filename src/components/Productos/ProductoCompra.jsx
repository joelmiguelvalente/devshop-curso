// /src/components/Productos/ProductoCompra.jsx
import { useState } from 'react';
import { useCart } from '@hooks/useCart';
import { useCounter } from '@hooks/useCounter';
import { useFavorito } from '@hooks/useFavorito';
import { Alerta } from '@ui/Alerta';
import { ButtonGroup, Button } from '@ui/Button';

export function Comprar({ id, nombre, precio, stock = 0 }) {
	const nombreFinal = nombre ?? 'Producto';
	const precioFinal = precio ?? 0;

	const { cantidad, incrementar, decrementar } = useCounter(stock > 0 ? 1 : 0, stock);
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
		addToCart({ id, title: nombreFinal, price: precioFinal }, 1);
		setAlerta({ tipo: 'success', mensaje: `Agregaste ${nombreFinal} al carrito.` });
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
			<ButtonGroup fullWidth>
				<Button onClick={handleAddToCart} disabled={sinStock} fullWidth>
					Añadir al carrito
				</Button>
				<Button isOnlyIcon aria-label={favorito ? 'Quitar de favoritos' : 'Añadir a favoritos'} onClick={handleFavorito}>
					{/* Emojis obtenidos desde: https://emojipedia.org/ */}
					{favorito ? '💔' : '💖'}
				</Button>
			</ButtonGroup>
		</>
	);
}