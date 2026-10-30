// src/pages/auth/Register.jsx
import { useState } from 'react';
// Librerias
import { useNavigate } from 'react-router';
import { useForm } from 'react-hook-form';
import { Turnstile } from '@marsidev/react-turnstile';
// Constante
import { COLECCION, ROL_DEFAULT } from '@constants/collections';
// Componentes
import { Alerta } from '@ui/Alerta';
import { Button } from '@ui/Button';
import { Form } from '@ui/Form';
import { Input } from '@ui/Inputs';
// Utilidades
import { createSchemaResolver } from '@utils/rhfResolver';
import { getRandomAvatar } from '@utils/Avatar';
import { mensajeAmigable } from '@utils/AuthError';
// Servicios
import { saveDoc } from '@services/firestore.service';
import { registerUser } from '@services/auth.service';
// Esquema
import { registerFieldDefault, registerSchema } from '@schemas/registerSchema';

const stateAlertDefault = { tipo: '', mensaje: '' };

export function Register() {
    const navigate = useNavigate();
    const [alert, setAlert] = useState(stateAlertDefault);
    const [turnstileToken, setTurnstileToken] = useState(null);

    const {
        register,
        handleSubmit,
        formState: {
            errors,
            isSubmitting
        }
    } = useForm({
        defaultValues: registerFieldDefault,
        resolver: createSchemaResolver(registerSchema),
        mode: 'onTouched'
    });

    // handlerRegister(onSubmit)
    const onSubmit = async ({ name, email, password, label }) => {
        setAlert(stateAlertDefault);

        if (!turnstileToken) {
            setAlert({ tipo: 'error', mensaje: 'Por favor, completa la verificación de seguridad.' });
            return;
        }

        let user;
        try {
            ({ user } = await registerUser(email, password));
        } catch ({ code, message }) {
            console.error('Error en el registro:', code, message);
            setAlert({
                tipo: 'error',
                mensaje: mensajeAmigable(code)
            });
            return;
        }

        try {
            await saveDoc(COLECCION.usuarios, user.uid, {
                name,
                email,
                avatar: getRandomAvatar(user.uid),
                label,
                rol: ROL_DEFAULT
            });
        } catch (err) {
            console.error('Error guardando el perfil:', err);
            setAlert({
                tipo: 'error',
                mensaje: 'La cuenta se creó pero no se pudo guardar tu perfil. Avisá al administrador.'
            });
            return;
        }

        // createUserWithEmailAndPassword ya deja al usuario logueado
        navigate('/');
    };

    return (
        <div>
            <h2>Crear Cuenta</h2>
            {alert.mensaje && (
                <div className="mb-3">
                    <Alerta
                        type={alert.tipo}
                        message={alert.mensaje}
                        onClose={() => setAlert(stateAlertDefault)}
                    />
                </div>
            )}
            <Form onSubmit={handleSubmit(onSubmit, () =>
                setAlert({ tipo: 'error', mensaje: 'Revisá los campos marcados.' })
            )}>
                <Input
                    label="Nickname:"
                    type="text"
                    placeholder="Ej: JhonDoe"
                    error={errors.name?.message}
                    required
                    {...register('name')}
                />
                <Input
                    label="Correo electrónico:"
                    type="email"
                    placeholder="Ej: jhondoe@example.com"
                    error={errors.email?.message}
                    required
                    {...register('email')}
                />
                <Input
                    label="Contraseña:"
                    type="password"
                    placeholder="••••••••"
                    autoComplete="new-password"
                    error={errors.password?.message}
                    required
                    {...register('password')}
                />
                <Input
                    label="Confirmar Contraseña:"
                    type="password"
                    placeholder="••••••••"
                    autoComplete="new-password"
                    error={errors.confirm?.message}
                    required
                    {...register('confirm')}
                />
                <div className="mb-3">
                    <Turnstile
                        siteKey={import.meta.env.VITE_TURNSTILE_SITEKEY}
                        onSuccess={(token) => setTurnstileToken(token)}
                        onExpire={() => setTurnstileToken(null)}
                        onError={() => setTurnstileToken(null)}
                    />
                </div>
                <Button type="submit" variant="brand" disabled={isSubmitting || !turnstileToken} fullWidth size="md">
                    {isSubmitting ? 'Creando cuenta...' : 'Registrarme'}
                </Button>

                <Button type="button" onClick={() => navigate('/auth/login')} variant="ghost" fullWidth size="md">
                    ¿Ya tenés cuenta? Iniciá sesión
                </Button>
            </Form>
        </div>
    );
}
