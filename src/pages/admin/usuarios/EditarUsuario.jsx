// src/pages/admin/usuarios/EditarUsuario.jsx
import { useParams, useNavigate } from 'react-router';
import { useSingle, updateDocument } from '@hooks/useQuery';
import { Formulario } from '@dashboard/usuarios/Formulario';

export function EditarUsuario() {
    const { uid } = useParams();
    const { datos } = useSingle('team', uid);
    const navigate = useNavigate();

    // Esperamos a que los datos de Firebase estén listos
    if (!datos) {
        return <p>Cargando datos del usuario...</p>;
    }

    const actualizar = async (datosRecibidos) => {
        await updateDocument('team', uid, datosRecibidos);
        // Redirección después de editar
        setTimeout(() => navigate('/admin/usuarios'), 2000);
    };

    return (
        <Formulario
            key={uid}
            datosIniciales={datos}
            titulo="Formulario para editar al usuario"
            etiquetaBoton="Guardar Cambios"
            alEnviar={actualizar}
        />
    );
}
