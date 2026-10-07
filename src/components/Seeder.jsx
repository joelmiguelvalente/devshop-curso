import { useState } from 'react';
import { db } from '@fireconfig/config';
import { collection, doc, writeBatch } from 'firebase/firestore';

// Configuración centralizada de las colecciones a sembrar
const SEED_CONFIGS = [
	{ label: 'Productos', 	filename: 'productos.json',  collectionName: 'products' },
	{ label: 'Nosotros', 	filename: 'nosotros.json', 	 collectionName: 'team' },
	{ label: 'Categorías', 	filename: 'categorias.json', collectionName: 'categories' },
];

const SeedButton = ({ onClick, loading }) => (
	<button
		onClick={onClick}
		disabled={loading}
		style={{
			padding: '0.4rem 0.8rem',
			backgroundColor: loading ? '#9CA3AF' : '#10B981',
			color: 'white',
			border: 'none',
			borderRadius: '0.375rem',
			cursor: loading ? 'not-allowed' : 'pointer',
			fontSize: '0.875rem',
			fontWeight: '500',
			transition: 'background-color 0.2s',
		}}
	>
		{loading ? 'Cargando...' : 'Ejecutar'}
	</button>
);

export const Seeder = () => {
	// Estado para controlar qué colección se está subiendo actualmente
	const [loadingKey, setLoadingKey] = useState(null);
	const executeSeeding = async ({ filename, collectionName, label }) => {
		setLoadingKey(collectionName);
		console.log(`🚀 Iniciando carga masiva para: ${label}...`);
		try {
			// Fetch eficiente del archivo JSON
			const response = await fetch(`/data/${filename}`);
			if (!response.ok) throw new Error(`No se pudo leer /data/${filename}`);
			const data = await response.json();
			if (!Array.isArray(data) || data.length === 0) {
				throw new Error('El archivo JSON está vacío o no es un Array válido.');
			}
			// Uso de Batches para optimizar la escritura en Firestore
			const batch = writeBatch(db);
			const collectionRef = collection(db, collectionName);
			data.forEach((item) => {
				// Genera una referencia de documento con ID automático
				const docRef = doc(collectionRef);
				batch.set(docRef, item);
			});
			// Envía todos los documentos juntos en un solo viaje de red (Máx 500 por batch)
			await batch.commit();
			console.log(`✅ ¡${data.length} documentos subidos a la colección "${collectionName}"!`);
			alert(`🎉 ¡Se cargaron ${data.length} registros en ${label} con éxito!`);
		} catch (error) {
			console.error(`❌ Error en ${label}:`, error);
			alert(`Hubo un error al procesar ${label}. Revisa la consola.`);
		} finally {
			setLoadingKey(null);
		}
	};

	return (
		<div style={{ maxWidth: '600px', margin: '2rem auto', fontFamily: 'system-ui, sans-serif' }}>
			<table style={{ width: '100%', borderCollapse: 'collapse', border: '1px solid #E5E7EB', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
				<thead>
					<tr style={{ backgroundColor: '#F3F4F6' }}>
						<th colSpan="3" style={{ padding: '0.75rem', borderBottom: '2px solid #E5E7EB', textAlign: 'center', fontWeight: '600' }}>
							Cargador Automático (Ruta Pública)
						</th>
					</tr>
				</thead>
				<tbody>
					{SEED_CONFIGS.map((config) => {
						const isTargetLoading = loadingKey === config.collectionName;
						return (
							<tr key={config.collectionName} style={{ borderBottom: '1px solid #E5E7EB' }}>
								<td style={{ padding: '0.75rem', fontWeight: '500' }}>{config.label}</td>
								<td style={{ padding: '0.75rem', color: '#6B7280', fontSize: '0.875rem' }}>/data/{config.filename}</td>
								<td style={{ padding: '0.75rem', textAlign: 'right' }}>
									<SeedButton onClick={() => executeSeeding(config)} loading={isTargetLoading} />
								</td>
							</tr>
						);
					})}
				</tbody>
			</table>
		</div>
	);
};
