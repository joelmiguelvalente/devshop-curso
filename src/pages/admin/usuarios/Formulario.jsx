// src/pages/admin/usuarios/Formulario.jsx
import { useState } from 'react';
import Image from '@ui/Image';
import { Alerta } from '@ui/Alerta';
import { SubSection } from '@ui/Section';
import { Input } from '@ui/Inputs';
import { Form, Legend } from '@ui/Form';
import { Button } from '@ui/Button';
import { useUpload } from '@hooks/useUpload';
import { validarInputsUsuarios } from '@utils/Validate';

const AVATAR_MIN = 120;
const AVATAR_MAX = 350;

const formDefault = {
    name: '',
    email: '',
    role: '',
    avatar: null
};

const leerDimensiones = (file) => new Promise((resolve, reject) => {
    const url = URL.createObjectURL(file);
    const img = new window.Image();
    img.onload = () => {
        URL.revokeObjectURL(url);
        resolve({ width: img.naturalWidth, height: img.naturalHeight });
    };
    img.onerror = () => {
        URL.revokeObjectURL(url);
        reject(new Error('No se pudo leer la imagen.'));
    };
    img.src = url;
});

export function Formulario({ datosIniciales = formDefault, titulo, etiquetaBoton, alEnviar }) {
    const [datosForm, setDatosForm] = useState(datosIniciales);
    const [errores, setErrores] = useState({});
    const [alert, setAlerta] = useState({ tipo: '', mensaje: '' });
    const [cargando, setCargando] = useState(false);

    const { uploadImage, cargando: cargandoAvatar, error: errorAvatar, limpiar } = useUpload();

    const manejarCambio = ({ target: { name, value } }) => {
        setDatosForm({ ...datosForm, [name]: value });
        setErrores((prev) => ({ ...prev, [name]: undefined }));
    };

    const manejarCambioAvatar = async ({ target }) => {
        const file = target.files?.[0];
        if (!file) return;
        setAlerta({ tipo: '', mensaje: '' });
        if (!file.type.startsWith('image/')) {
            target.value = '';
            setErrores((prev) => ({ ...prev, avatar: 'El archivo debe ser una imagen.' }));
            return;
        }
        try {
            const { width, height } = await leerDimensiones(file);
            if (width < AVATAR_MIN || height < AVATAR_MIN || width > AVATAR_MAX || height > AVATAR_MAX) {
                target.value = '';
                setErrores((prev) => ({
                    ...prev,
                    avatar: `El avatar debe medir entre ${AVATAR_MIN} y ${AVATAR_MAX} px por lado (actual: ${width}x${height}).`
                }));
                return;
            }
        } catch {
            target.value = '';
            setErrores((prev) => ({ ...prev, avatar: 'No se pudo leer la imagen.' }));
            return;
        }
        // Dimensiones válidas: recién ahí se sube (evita gastar subidas en archivos rechazados)
        const url = await uploadImage(file);
        if (url) {
            setDatosForm((prev) => ({ ...prev, avatar: url }));
            setErrores((prev) => ({ ...prev, avatar: undefined }));
        } else {
            setErrores((prev) => ({ ...prev, avatar: 'No se pudo subir el avatar. Intentá de nuevo.' }));
        }
    };

    const manejarEnvioLocal = async (evento) => {
        evento.preventDefault();
        const e = validarInputsUsuarios(datosForm);
        setErrores(e);
        if (Object.keys(e).length > 0) {
            setAlerta({
                tipo: 'error',
                mensaje: 'Revisa los campos marcados.'
            });
            return;
        }
        setCargando(true);
        setAlerta({ tipo: '', mensaje: '' });
        try {
            await alEnviar(datosForm);
            setAlerta({
                tipo: 'success',
                mensaje: 'Operación realizada con éxito.'
            });
            if (!datosIniciales?.id) {
                setDatosForm(formDefault);
                limpiar();
            }
        } catch (err) {
            console.error(err);
            setAlerta({
                tipo: 'error',
                mensaje: 'Hubo un error. Por favor, intentá de nuevo.'
            });
        } finally {
            setCargando(false);
        }
    };

    return (
        <>
            {alert.mensaje && (
                <div className="mb-3">
                    <Alerta
                        type={alert.tipo}
                        message={alert.mensaje}
                        onClose={() => setAlerta({ tipo: '', mensaje: '' })}
                    />
                </div>
            )}
            <SubSection label={titulo} />
            <Form onSubmit={manejarEnvioLocal}>
                <Legend>Administrar datos</Legend>
                <Input
                    label="Nombre del Usuario:"
                    type="text"
                    name="name"
                    placeholder="Ej: Jhon Doe"
                    value={datosForm.name}
                    onChange={manejarCambio}
                    error={errores.name}
                    required
                />
                <Input
                    label="Email:"
                    type="email"
                    name="email"
                    placeholder="Ej: jhondoe@example.com"
                    value={datosForm.email}
                    onChange={manejarCambio}
                    error={errores.email}
                    required
                />
                <Input
                    label="Rol:"
                    type="text"
                    name="role"
                    placeholder="Ej: Administrador"
                    value={datosForm.role}
                    onChange={manejarCambio}
                    error={errores.role}
                    required
                />
                <Input
                    label="Avatar (120 a 350 px por lado):"
                    type="file"
                    name="avatar"
                    onChange={manejarCambioAvatar}
                    error={errores.avatar}
                    key={datosForm.avatar ? 'subido' : 'pendiente'}
                />

                {cargandoAvatar && <p className="text-sm text-muted">Subiendo avatar...</p>}
                {errorAvatar && <p className="text-sm text-error">{errorAvatar}</p>}
                {datosForm.avatar && (
                    <Image
                        image={datosForm.avatar}
                        alt="Vista previa del avatar"
                        cx="my-2 rounded-full"
                        type="avatar"
                        size="120"
                    />
                )}

                <Button type="submit" variant="brand" disabled={cargando || cargandoAvatar} fullWidth size="md">
                    {cargando ? 'Procesando...' : etiquetaBoton}
                </Button>
            </Form>
        </>
    );
}
