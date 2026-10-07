// src/hooks/useQuery.jsx
import { useState, useEffect } from 'react';
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
    deleteDoc,
    getCountFromServer,
    onSnapshot
} from 'firebase/firestore';
import { useFetchData } from '@hooks/useFetch';

function buildQuery(tabla, {
    filters = [],
    order = null,
    limit: limitDoc = null
} = {}) {
    const restricciones = filters.map(([campo, operador, valor]) => where(campo, operador, valor));
    if (order) restricciones.push(order.length > 1 ? orderBy(order[0], order[1]) : orderBy(order[0]));
    if (limitDoc) restricciones.push(limit(limitDoc));
    const referencia = collection(db, tabla);
    return restricciones.length ? query(referencia, ...restricciones) : referencia;
}

function mapDocs(snapshot) {
    return snapshot.docs.map((d) => ({ id: d.id, ...d.data() }));
}

export function useAll(tabla, opciones = {}) {
    const clave = JSON.stringify({ tabla, ...opciones });

    return useFetchData(async () => {
        const consulta = buildQuery(tabla, opciones);
        return mapDocs(await getDocs(consulta));
    }, clave, { inicial: [] });
}

export function useSingle(tabla, id) {
    const clave = JSON.stringify({ tabla, id });

    return useFetchData(async () => {
        const docSnapshot = await getDoc(doc(db, tabla, id));
        if (!docSnapshot.exists()) {
            throw new Error(`El documento con ID ${id} no existe en la colección ${tabla}.`);
        }
        return { id: docSnapshot.id, ...docSnapshot.data() };
    }, clave, { inicial: null });
}

export function useGetByIds(tabla, idsBuscados = [], campoId = "__name__") {
    const clave = JSON.stringify({ tabla, idsBuscados, campoId });
    return useFetchData(async () => {
        // Si el array de IDs está vacío, evitamos hacer una petición inválida a Firestore
        if (!idsBuscados || idsBuscados.length === 0) return [];
        const referencia = collection(db, tabla);
        const consulta = query(referencia, where(campoId, "in", idsBuscados));
        return mapDocs(await getDocs(consulta));
    }, clave, { inicial: [] });
}

export function useCount(tabla, opciones = {}) {
    const clave = JSON.stringify({ type: 'count', tabla, ...opciones });

    return useFetchData(async () => {
        const consulta = buildQuery(tabla, opciones);
        const snapshot = await getCountFromServer(consulta);
        return snapshot.data().count;
    }, clave, { inicial: 0 });
}

export async function addDocument(tabla, data) {
    const referencia = await addDoc(collection(db, tabla), data);
    return referencia.id;
}

export async function setDocument(tabla, id, data, { merge = true } = {}) {
    await setDoc(doc(db, tabla, id), data, { merge });
}

export async function updateDocument(tabla, id, data) {
    await updateDoc(doc(db, tabla, id), data);
}

export async function deleteDocument(tabla, id) {
    await deleteDoc(doc(db, tabla, id));
}

export function useAllLive(tabla, opciones = {}) {
    const [datos, setDatos] = useState([]);
    const [error, setError] = useState(null);
    const [cargando, setCargando] = useState(true);
    const clave = JSON.stringify({ tabla, ...opciones });

    useEffect(() => {
        // sin setCargando(true) aquí
        const consulta = buildQuery(tabla, opciones);
        const unsub = onSnapshot(consulta, (snap) => {
            setDatos(mapDocs(snap));
            setError(null);
            setCargando(false);
        }, (err) => {
            setError(err.message);
            setCargando(false);
        });
        return () => unsub();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [clave]);

    return { datos, error, cargando };
}