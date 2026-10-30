// src/services/firestore.service.js
import { db } from '@fireconfig/config';
import {
	doc,
	query,
	where,
	limit,
	getDoc,
	addDoc,
	setDoc,
	getDocs,
	orderBy,
	updateDoc,
	deleteDoc,
	collection,
	writeBatch,
	getCountFromServer
} from 'firebase/firestore';

/**
 * Helper: Construye dinámicamente queries con filtros, orden y límites.
 */
export function buildQuery(collectionName, {
	filters = [], order = null, limitTo = null
} = {}) {
	const constraints = filters.map(([field, op, value]) => where(field, op, value));
	// Ordenar
	if (order) {
		constraints.push(order.length > 1 ? orderBy(order[0], order[1]) : orderBy(order[0]));
	}
	// Limitar
	if (limitTo) {
		constraints.push(limit(limitTo));
	}
	// Referenciamos
	const ref = collection(db, collectionName);
	return constraints.length ? query(ref, ...constraints) : ref;
}

/**
 * Helper: Transforma snapshots de Firestore en arrays de objetos limpios con su ID.
 */
export const mapSnapshot = (snapshot) => snapshot.docs.map(d => ({ id: d.id, ...d.data() }));

/* MÉTODOS DE LECTURA */

// Buscar muchos
export async function findMany(collectionName, options = {}) {
	const q = buildQuery(collectionName, options);
	const snapshot = await getDocs(q);
	return mapSnapshot(snapshot);
}

// Buscar uno
export async function findOne(collectionName, id) {
	const docRef = doc(db, collectionName, id);
	const snapshot = await getDoc(docRef);
	if (!snapshot.exists()) throw new Error(`Documento ${id} no existe en ${collectionName}`);
	return { id: snapshot.id, ...snapshot.data() };
}

// Contar documentos
export async function countDocs(collectionName, options = {}) {
	const q = buildQuery(collectionName, options);
	const snapshot = await getCountFromServer(q);
	return snapshot.data().count;
}

/**
 * Busca múltiples documentos en una colección cuyos IDs (o un campo específico)
 * coincidan con los elementos de un array proporcionado.
 */
export async function findManyByIds(collectionName, ids = [], fieldId = "__name__") {
	// Evitamos peticiones inválidas o errores de Firestore si el array viene vacío
	if (!ids || ids.length === 0) return [];

	const ref = collection(db, collectionName);
	const q = query(ref, where(fieldId, "in", ids));
	const snapshot = await getDocs(q);

	return mapSnapshot(snapshot);
}

/* MÉTODOS DE ESCRITURA / MUTACIONES */

// Crear (create) C
export async function createDoc(collectionName, data) {
	const ref = await addDoc(collection(db, collectionName), data);
	return ref.id;
}

// Guardar (update) U
export async function saveDoc(collectionName, id, data, merge = true) {
	await setDoc(doc(db, collectionName, id), data, { merge });
}

// Editar (update) U
export async function patchDoc(collectionName, id, data) {
	await updateDoc(doc(db, collectionName, id), data);
}

// Elimina (delete) D
export async function destroyDoc(collectionName, id) {
	await deleteDoc(doc(db, collectionName, id));
}

export function wBatch() {
	return writeBatch(db);
}