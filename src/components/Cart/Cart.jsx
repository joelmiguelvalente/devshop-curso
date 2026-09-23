// src/components/Cart/Cart.jsx
import { useCart } from '@hooks/useCart';
import { obtenerPrecio, obtenerSubtotal } from '@utils/CompactNumber';
import { Button } from '@ui/Button'

const Cart = () => {

	const {
		addToCart,
		cart: productos,
		clearCart,
		decreaseQuantity,
		getCartTotal,
		removeFromCart
	} = useCart();

	if (productos.length === 0) {
		return (
			<div className="empty">
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
				<thead>
		            <tr>
		                <th>Nombre</th>
		                <th>Cantidad</th>
		                <th>Precio unitario</th>
		                <th>Subtotal</th>
		                <th>Acción</th>
		            </tr>
		        </thead>
				<tbody>
					{productos.map(item => {
						const {	id,	price, quantity, title } = item;

						const unitario = obtenerPrecio(price);
						const subtotal = obtenerSubtotal(price, quantity);
						return (
							<tr key={id} className="cart-item">
								<td className="nombre">{title}</td>
								<td className="cantidad font-bold">
									<div className="flex justify-center items-center gap-2">
										<button onClick={() => decreaseQuantity(id)}>−</button>
										{quantity}
										<button onClick={() => addToCart(item, 1)}>+</button>
									</div>
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
			<div className="flex justify-center items-center gap-3 mt-3">
				<Button variant="ghost" onClick={clearCart}>Vaciar Carrito</Button>
				<Button>Finalizar compra</Button>
			</div>
		</div>
	);

};

export default Cart;