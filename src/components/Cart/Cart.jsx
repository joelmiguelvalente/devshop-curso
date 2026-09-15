// src/components/Cart/Cart.jsx
import { useCart } from '@hooks/useCart';
import { obtenerPrecio, obtenerSubtotal } from '@utils/obtenerPrecios';
import { THead } from '@components/Cart/THead';

const Cart = () => {

	const {
		cart: productos,
		clearCart,
		getCartTotal,
		addToCart,
		removeFromCart,
		decreaseQuantity
	} = useCart();

	if (productos.length === 0) {
		return (
			<div className="text-center py-5 my-5">
				<h1 className="text-4xl pb-4">El carrito está vacío</h1>
				<p className="text-xl">Agrega productos para continuar la compra.</p>
			</div>
		);
	}

	const total = obtenerPrecio(getCartTotal());
	return (
		<div>
			<h1 className="text-4xl my-3">Carrito de Compras</h1>
			<table className="cart">
				<THead items={["Nombre", "Cantidad", "Precio unitario", "Subtotal", "Acción"]} />
				<tbody>
					{productos.map(item => {
						const {	id,	price, quantity, title } = item;

						const unitario = obtenerPrecio(price);
						const subtotal = obtenerSubtotal(price, quantity);
						return (
							<tr key={id} className="cart-item">
								<td className="nombre">{title}</td>
								<td className="cantidad font-bold text-center">
									<button onClick={() => decreaseQuantity(id)}>−</button>
									{quantity}
									<button onClick={() => addToCart(item, 1)}>+</button>
								</td>
								<td className="precio font-bold text-right">{unitario}</td>
								<td className="precio font-bold text-right">{subtotal}</td>
								<td className="text-center"><button className="bg-error text-error inline-block px-2 rounded-2" style={{ paddingBlock: ".32rem" }} onClick={() => removeFromCart(id)}>Quitar</button></td>
							</tr>
						)}
					)}
				</tbody>
				<tfoot>
					<tr>
						<td colSpan="5" className="text-right">
							<h3 className="text-lg">Total a pagar: {total}</h3>
						</td>
					</tr>
				</tfoot>
			</table>
			<hr />
			<button className="rounded-2 font-medium bg-primary py-1 px-3 text-lg mt-3" type="button" onClick={clearCart}>Vaciar Carrito</button>
		</div>
	);

};

export default Cart;