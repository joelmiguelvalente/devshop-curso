// /src/components/Productos/ItemButtonCart.jsx
import { useCounter } from '@hooks/useCounter';
import { useFavorito } from '@hooks/useFavorito';
import { BtnComprar } from '@ui/BtnComprar';

export function ItemButtonCart({ id, nombre, stock }) {

	const { cantidad/*, stocked, decrementar, incrementar*/ } = useCounter(0, stock);
	const { guardado, accionFavorito } = useFavorito(id, nombre);

	return (
		<>
   			{/*<p className="stock text-sm">
				{stocked === 0 ? ('Sin stock') : (
					<>
						Stock disponible: <strong>{stocked}</strong>
				  	</>
				)}
			</p>

			<div className="counter bg-background rounded-2 overflow-hidden flex justify-center items-center">
				<button type="button" aria-label={`Disminuir cantidad de ${nombre}`} onClick={decrementar}>➖</button>
				<p aria-live="polite" aria-atomic="true">
        			<span className="sr-only">Cantidad seleccionada: </span>
        			{cantidad}
      			</p>
				<button type="button" aria-label={`Aumentar cantidad de ${nombre}`} onClick={incrementar}>➕</button>
			</div>*/}
			<div className="buttons w-full flex justify-center items-center gap-3 mt-3">
				<BtnComprar id={id} nombre={nombre} cantidad={cantidad} />
				<button aria-label={guardado ? 'Quitar de favoritos' : 'Añadir a favoritos'} className="agregar-favorito rounded-2 text-lg" onClick={() => accionFavorito()} type="button">
					{/* Emojis obtenidos desde: https://emojipedia.org/ */}
					{guardado ? '💔' : '💖'}
				</button>
			</div>
		</>
	);
}