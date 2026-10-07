// src/pages/admin/usuarios/AgregarUsuario.jsx
import { useNavigate } from 'react-router';
import { addDocument } from '@hooks/useQuery';
import { Formulario } from '@dashboard/usuarios/Formulario';

export function AgregarUsuario() {
    const navigate = useNavigate();

    const guardarNuevoUsuario = async (datosDelFormulario) => {
        await addDocument('team', datosDelFormulario);
        // Redirección después de crear
        setTimeout(() => navigate('/admin/usuarios'), 2000);
    };

    return (
        <Formulario
            titulo="Formulario para crear usuario"
            etiquetaBoton="Crear Usuario"
            alEnviar={guardarNuevoUsuario}
        />
    );
}
