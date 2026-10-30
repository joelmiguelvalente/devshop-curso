// src/services/auth.service.js
import { auth } from '@fireconfig/config';
import {
    signOut,
    onAuthStateChanged,
    updatePassword,
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
} from 'firebase/auth';

// Nombres descriptivos y funciones específicas

export const registerUser = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
};

export const loginUser = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
};

export const logoutUser = () => {
    return signOut(auth);
};

// Cambio de contraseña desde el perfil (requiere sesion reciente)
export const updateUserPassword = (user, newPassword) => {
    return updatePassword(user, newPassword);
};

// Pasamos la función callback directamente sin ejecutarla aquí
export const subscribeToAuthChanges = (callback) => {
    return onAuthStateChanged(auth, callback);
};