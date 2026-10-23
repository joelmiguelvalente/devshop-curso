// src/hook/useAuth.jsx
import { createContext, useContext } from 'react';

const AuthContext = createContext(null);

export function useAuth() {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth debe usarse dentro de AuthProvider');
    }
    return context;
}

export { AuthContext };