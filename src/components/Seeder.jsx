import { db } from '@fireconfig/config';
import { collection, addDoc } from 'firebase/firestore';

export const Seeder = () => {

	const uploadProducts = async () => {
		try {
			const response = await fetch('/data/productos.json');
			if (!response.ok) {
				throw new Error("No se pudo leer el archivo JSON de la ruta pública.");
			}

			const productsData = await response.json();
			const productsCollectionRef = collection(db, "products");

			console.log("Iniciando la carga masiva desde la carpeta public...");

			for (const product of productsData) {
				// eslint-disable-next-line no-unused-vars
				const { id, ...productWithoutId } = product;
				await addDoc(productsCollectionRef, productWithoutId);
				console.log(`✅ Producto subido con ID automático: ${product.title}`);
			}

			alert("🎉 ¡Los 20 productos de tu JSON público se cargaron con éxito en Firestore!");
		} catch (error) {
			console.error("❌ Error durante el proceso de carga:", error);
			alert("Hubo un error al procesar el archivo. Revisa los detalles en la consola.");
		}
	};

	return (
		<div style={{ padding: '20px', border: '2px dashed #ccc', margin: '20px 0', textAlign: 'center' }}>
			<h3>Cargador Automático (Ruta Pública)</h3>
			<p>Lee desde <code>/data/productos.json</code> e inyecta los datos en Firebase.</p>
			<button
				onClick={uploadProducts}
				style={{ padding: '10px 20px', backgroundColor: '#4CAF50', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}
			>
				Subir Productos a Firestore
			</button>
		</div>
	);
};
