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
            try {
                if (currentUser) {
                    const userDocSnap = await findOne(COLECCION.usuarios, currentUser.uid);
                    setUser(currentUser);
                    setRol(userDocSnap?.rol === ADMINISTRADOR ? ADMINISTRADOR : ROL_DEFAULT);
                } else {
                    setUser(null);
                    setRol(null);
                }
            } catch (err) {
                console.error('Error al cargar el perfil del usuario:', err);
                setUser(currentUser);
                setRol(ROL_DEFAULT);
            } finally {
                setLoading(false);
            }
        });

        return () => unsubscribe();
    }, []);

    const value = {
        user,
        rol,
        loading,
        signup,
        login,
        logout,
    };

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    );
};
