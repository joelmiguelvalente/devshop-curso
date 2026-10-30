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
                if (userDocSnap.rol === ADMINISTRADOR) {
                    // Si el documento existe y tiene rol de admin, lo asignamos.
                    setUser({ ...currentUser, rol: ADMINISTRADOR });
                } else {
                    // Para cualquier otro caso, es un usuario regular.
                    setUser({ ...currentUser, rol: ROL_DEFAULT });
                }
            } else {
                setUser(null);
            }
            setLoading(false);
        });

        // Limpiamos el observador al desmontar
        return () => unsubscribe();
    }, []); // Agregamos 'auth' como dependencia

    // Crear el objeto 'value' con TODAS las funciones definidas
    const value = {
        user,
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
