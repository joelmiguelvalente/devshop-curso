// src/services/auth.service.js
import { auth } from '@fireconfig/config';
import {
    onAuthStateChanged,
    signOut,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword
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

// Pasamos la función callback directamente sin ejecutarla aquí
export const subscribeToAuthChanges = (callback) => {
    return onAuthStateChanged(auth, callback);
};