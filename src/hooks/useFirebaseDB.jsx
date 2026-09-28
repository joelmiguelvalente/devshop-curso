// src/hooks/useFirebaseDB.jsx
import { db } from '@fireconfig/config';
import {
    collection,
    getDocs,
    doc,
    getDoc,
    query,
    where,
    orderBy,
    limit,
    addDoc,
    setDoc,
    updateDoc,
    deleteDoc
} from 'firebase/firestore';
import { useFetchData } from '@hooks/useFetch';

function construirConsulta(table, { filters = [], orden = null, limite = null } = {}) {
    const restricciones = filters.map(([campo, operador, valor]) => where(campo, operador, valor));
    if (orden) {
        restricciones.push(orden.length > 1 ? orderBy(orden[0], orden[1]) : orderBy(orden[0]));
    }
    if (limite) {
        restricciones.push(limit(limite));
    }
    const referencia = collection(db, table);
    return restricciones.length ? query(referencia, ...restricciones) : referencia;
}

function mapearDocumentos(snapshot) {
    return snapshot.docs.map((d) => ({ id: d.id, ...d.data() }));
}

export function useGetAll(table, opciones = {}) {
    const clave = JSON.stringify({ table, ...opciones });

    return useFetchData(async () => {
        const consulta = construirConsulta(table, opciones);
        return mapearDocumentos(await getDocs(consulta));
    }, clave, { inicial: [] });
}

export function useGetSingle(table, id) {
    const clave = JSON.stringify({ table, id });

    return useFetchData(async () => {
        const docSnapshot = await getDoc(doc(db, table, id));
        if (!docSnapshot.exists()) {
            throw new Error(`El documento con ID ${id} no existe en la colección ${table}.`);
        }
        return { id: docSnapshot.id, ...docSnapshot.data() };
    }, clave, { inicial: null });
}

export async function addDocument(table, data) {
    const referencia = await addDoc(collection(db, table), data);
    return referencia.id;
}

export async function setDocument(table, id, data, { merge = true } = {}) {
    await setDoc(doc(db, table, id), data, { merge });
}

export async function updateDocument(table, id, data) {
    await updateDoc(doc(db, table, id), data);
}

export async function deleteDocument(table, id) {
    await deleteDoc(doc(db, table, id));
}