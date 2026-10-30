// src/hooks/useFirestore.jsx
import { useState, useEffect } from 'react';
// Libreria
import { onSnapshot } from 'firebase/firestore';
// Servicio
import { findMany, findOne, buildQuery, mapSnapshot, findManyByIds } from '@services/firestore.service';

/**
 * HOOK INTERNO
 */
function useAsyncState(fn, dependencies, initialData = null) {
	const [data, setData] = useState(initialData);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	useEffect(() => {
		let isMounted = true;
		// eslint-disable-next-line react-hooks/set-state-in-effect
		setLoading(true);

		fn(isMounted).then((res) => {
			if (isMounted && res !== undefined) {
				setData(res);
				setError(null);
			}
		})
		.catch((err) => {
			if (isMounted) setError(err.message || err);
		})
		.finally(() => {
			if (isMounted) setLoading(false);
		});

		return () => { isMounted = false; };
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, dependencies);
	return { data, loading, error };
}

/* HOOKS EXPORTADOS */

/**
 * Hook Global para traer un ÚNICO documento por su ID
 */
export function useFirestoreDoc(collectionName, id) {
	return useAsyncState(
		async () => {
			if (!id) return;
			return await findOne(collectionName, id);
		}, [collectionName, id], null
	);
}

/**
 * Hook Global para consultas estáticas de múltiples documentos
 */
export function useFirestoreQuery(collectionName, options = {}) {
	const queryKey = JSON.stringify({ collectionName, ...options });

	return useAsyncState(
		async () => await findMany(collectionName, options),
		[queryKey], []
	);
}

/**
 * Hook Global para escuchar una colección en tiempo real (Suscripción Live)
 */
export function useFirestoreLive(collectionName, options = {}) {
	const queryKey = JSON.stringify({ collectionName, ...options });

	const [data, setData] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	useEffect(() => {
		const q = buildQuery(collectionName, options);

		const unsubscribe = onSnapshot(q,
			(snapshot) => {
				setData(mapSnapshot(snapshot));
				setError(null);
				setLoading(false);
			},
			(err) => {
				setError(err.message || err);
				setLoading(false);
			}
		);

		return () => unsubscribe();
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [queryKey]);

	return { data, loading, error };
}

/**
 * Hook Global para buscar documentos que coincidan con un array de IDs (Fetch Único)
 */
export function useFirestoreQueryByIds(collectionName, ids = [], fieldId = "__name__") {
	// Serializamos los argumentos para que el useEffect sepa exactamente cuándo volver a consultar
	const queryKey = JSON.stringify({ collectionName, ids, fieldId });

	return useAsyncState(
	  	async () => {
			return await findManyByIds(collectionName, ids, fieldId);
	  	},
	  	[queryKey], [] // Estado inicial: Array vacío
	);
}