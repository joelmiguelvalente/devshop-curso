// En /context/AuthContext.jsx
import { useState, useEffect } from 'react';
// Constante
import { COLECCION, ADMINISTRADOR, ROL_DEFAULT } from '@constants/collections';
// Hook
import { AuthContext } from '@hooks/useAuth';
// Servicios
import { registerUser, loginUser, logoutUser, subscribeToAuthChanges } from '@services/auth.service';
import { findOne } from '@services/firestore.service';

// Crear el proveedor del contexto
export const AuthProvider = ({ children }) => {

    const [user, setUser] = useState(null);
    const [rol, setRol] = useState(null);
    const [loading, setLoading] = useState(true);

    // Función para registrar un nuevo usuario
    const signup = (email, password) => registerUser(email, password);

    // Función para iniciar sesión
    const login = (email, password) => loginUser(email, password);

    // Función para cerrar sesión
    const logout = () => logoutUser();

    useEffect(() => {
        const unsubscribe = subscribeToAuthChanges(async (currentUser) => {
            if (currentUser) {
                // Si hay un usuario, buscamos su rol en Firestore.
                const userDocSnap = await findOne(COLECCION.usuarios, currentUser.uid);
                // IMPORTANTE: el user de Firebase es una clase, NO se le hace spread
                // (pierde el prototipo y metodos como getIdToken). Se guarda la
                // instancia real y el rol se expone aparte en el contexto.
                setUser(currentUser);
                setRol(userDocSnap?.rol === ADMINISTRADOR ? ADMINISTRADOR : ROL_DEFAULT);
            } else {
                setUser(null);
                setRol(null);
            }
            setLoading(false);
        });

        // Limpiamos el observador al desmontar
        return () => unsubscribe();
    }, []); // Agregamos 'auth' como dependencia

    // Crear el objeto 'value' con TODAS las funciones definidas
    const value = {
        user,
        rol, // El rol vive aparte para no romper la instancia de Firebase
        loading, // Es buena práctica pasar el estado de carga también
        signup,
        login, // Ahora 'login' sí existe y se puede pasar
        logout,
    };

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    );
};
