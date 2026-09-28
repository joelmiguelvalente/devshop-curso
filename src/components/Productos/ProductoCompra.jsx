// /src/components/Productos/ProductoCompra.jsx
import { useState } from 'react';
import { Heart, HeartMinus, ShoppingCartPlus } from 'lucide-react';
import { useCart } from '@hooks/useCart';
import { useFavorito } from '@hooks/useFavorito';
import { Alerta } from '@ui/Alerta';
import { ButtonGroup, Button } from '@ui/Button';

export function Comprar(props) {
	const { id, title, price, stock = 0 } = props;
	const nombreProducto = title ?? 'Producto';

	const [favorito, setFavorito] 	= useFavorito(id, nombreProducto);
	const [alerta, setAlerta] 		= useState({ tipo: '', mensaje: '' });
	const { addToCart } 			= useCart();

	const sinStock = (stock <= 0);
	const __alerta = (tipo = '', mensaje = '') => setAlerta({ tipo, mensaje });

	const handleFavorito = () => {
		let prefijo = (!favorito ? 'Agregaste' : 'Quitaste');
		setFavorito();
		__alerta((!favorito ? 'success' : 'error'), `${prefijo} ${nombreProducto} de favoritos.`);
	};

	const handleAddToCart = () => {
		if (sinStock) {
			__alerta('warning', `${nombreProducto} no tiene stock disponible.`);
			return;
		}
		addToCart({
			id,
			title: nombreProducto,
			price: price ?? 0
		}, 1);
		__alerta('success', `Agregaste ${nombreProducto} al carrito.`);
	};

	const { mensaje, tipo } = alerta;
	let textoFavorito = (favorito ? 'Quitar de' : 'Añadir a') + ' favoritos';

	return (
		<>
			{mensaje && (
				<Alerta
					type={tipo}
					message={mensaje}
					onClose={__alerta}
				/>
			)}
			<ButtonGroup fullWidth>
				<Button onClick={handleAddToCart} disabled={sinStock} fullWidth>
					<ShoppingCartPlus aria-hidden="true" /> Añadir al carrito
				</Button>
				<Button isOnlyIcon aria-label={textoFavorito} onClick={handleFavorito}>
					{favorito ? <HeartMinus aria-hidden="true" /> : <Heart aria-hidden="true" />}
				</Button>
			</ButtonGroup>
		</>
	);
}