//src/routes/PotectedRoute.jsx
// Libreria
import { Navigate } from 'react-router';
// Hook
import { useAuth } from '@hooks/useAuth';

export function ProtectedRoute({ children, rolesPermitidos = [] }) {
    const { user, loading } = useAuth();

    if (loading) {
        return <div>Cargando...</div>;
    }

    if (!user || (rolesPermitidos && !rolesPermitidos.includes(user.rol))) {
        return <Navigate to="/auth/login" />;
    }

    return <>{children}</>;
};
