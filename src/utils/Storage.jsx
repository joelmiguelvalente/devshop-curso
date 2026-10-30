// src/utils/Storage.jsx
// Constant
import { STORAGE_KEY } from '@constants/storage';

const setName = k => STORAGE_KEY[k];

function getData(key, defaultValue = []) {
    const name = setName(key);
    try {
        const guardados = localStorage.getItem(name);
        return guardados ? JSON.parse(guardados) : defaultValue;
    } catch (error) {
        console.error(`Error leyendo la clave "${name}" desde localStorage:`, error);
        return defaultValue;
    }
}

export const obtener = (key, defaultValue) => {
    return getData(key, defaultValue);
}

export const guardar = (key, data) => {
    const name = setName(key);
    try {
        localStorage.setItem(name, JSON.stringify(data));
    } catch (error) {
        console.error(`Error guardando la clave "${name}" en localStorage:`, error);
    }
};

export const eliminar = (key) => {
    const name = setName(key);
    try {
        localStorage.removeItem(name);
    } catch (error) {
        console.error(`Error eliminando la clave "${name}" de localStorage:`, error);
    }
};
