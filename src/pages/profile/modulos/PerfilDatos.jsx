// src/pages/profile/modulos/PerfilDatos.jsx
import { useState, useEffect } from 'react';
// Librerias
import { useForm, useWatch } from 'react-hook-form';
// Constante
import { COLECCION } from '@constants/collections';
// Componentes
import { Alerta } from '@ui/Alerta';
import { Button } from '@ui/Button';
import { Form, Legend } from '@ui/Form';
import { Image } from '@ui/Image';
import { Input } from '@ui/Inputs';
// Hooks
import { useAuth } from '@hooks/useAuth';
import { useAvatarUpload } from '@hooks/useAvatar';
// Utilidades
import { createSchemaResolver } from '@utils/rhfResolver';
import { mensajeAmigable } from '@utils/AuthError';
// Servicio
import { updateUserPassword } from '@services/auth.service';
import { patchDoc } from '@services/firestore.service';
// Esquema
import {
    profileFieldDefault,
    profileSchema,
    passwordFieldDefault,
    passwordSchema
} from '@schemas/profileSchema';

export function PerfilDatos({ data }) {

    const { user } = useAuth();
    const [alert, setAlert] = useState({ tipo: '', mensaje: '' });

    // Formulario de datos (nombre + avatar)
    const {
        register,
        handleSubmit,
        reset,
        control,
        setValue,
        setError,
        clearErrors,
        formState: { errors, isSubmitting }
    } = useForm({
        defaultValues: profileFieldDefault,
        resolver: createSchemaResolver(profileSchema),
        mode: 'onTouched'
    });

    // Formulario de contraseña (separado: se manda a Firebase Auth, no a Firestore)
    const {
        register: registerPass,
        handleSubmit: handleSubmitPass,
        reset: resetPass,
        formState: { errors: errorsPass, isSubmitting: submittingPass }
    } = useForm({
        defaultValues: passwordFieldDefault,
        resolver: createSchemaResolver(passwordSchema),
        mode: 'onTouched'
    });

    // Cargar los datos actuales del usuario en el formulario
    useEffect(() => {
        if (data) {
            reset({ name: data.name ?? '', avatar: data.avatar ?? '' });
        }
    }, [data, reset]);

    const { handlerChangeAvatar, loadingAvatar, errorAvatar } = useAvatarUpload({ setError, clearErrors, setValue });
    const avatarUrl = useWatch({ control, name: 'avatar' });

    const onSubmit = async ({ name, avatar }) => {
        setAlert({ tipo: '', mensaje: '' });
        try {
            // Solo name y avatar: el usuario no debe tocar rol ni email desde acá
            await patchDoc(COLECCION.usuarios, user.uid, { name, avatar });
            setAlert({ tipo: 'success', mensaje: 'Se actualizó tu perfil con éxito.' });
        } catch (err) {
            console.error(err);
            setAlert({ tipo: 'error', mensaje: 'Hubo un error al guardar. Intentá de nuevo.' });
        }
    };

    const onChangePassword = async ({ password }) => {
        setAlert({ tipo: '', mensaje: '' });
        try {
            await updateUserPassword(user, password);
            resetPass();
            setAlert({ tipo: 'success', mensaje: 'Contraseña actualizada con éxito.' });
        } catch (err) {
            console.error(err);
            setAlert({ tipo: 'error', mensaje: mensajeAmigable(err.code) });
        }
    };

    return (
        <div className="flex flex-col gap-4">
            {alert.mensaje && (
                <Alerta
                    type={alert.tipo}
                    message={alert.mensaje}
                    onClose={() => setAlert({ tipo: '', mensaje: '' })}
                />
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2">
                <section className="bg-surface p-3">
                    <Form onSubmit={handleSubmit(onSubmit, () =>
                        setAlert({ tipo: 'error', mensaje: 'Revisá los campos marcados.' })
                    )}>
                        <Legend>Mis datos</Legend>
                        <Input
                            label="Nombre:"
                            type="text"
                            placeholder="Ej: Jane Doe"
                            error={errors.name?.message}
                            required
                            {...register('name')}
                        />
                        <Input
                            label="Email:"
                            type="email"
                            name="email"
                            value={data?.email ?? ''}
                            readOnly
                            disabled
                        />
                        <Input
                            label="Avatar (120 a 350 px por lado):"
                            type="file"
                            name="avatar"
                            onChange={handlerChangeAvatar}
                            error={errors.avatar?.message}
                            key={avatarUrl ? 'subido' : 'pendiente'}
                        />

                        {loadingAvatar && <p className="text-sm text-muted">Subiendo avatar...</p>}
                        {errorAvatar && <p className="text-sm text-error">{errorAvatar}</p>}
                        {avatarUrl && (
                            <Image image={avatarUrl} alt="Vista previa del avatar" cx="my-2 rounded-full" type="avatar" size="120" />
                        )}

                        <div className="flex justify-center items-center gap-3 mt-5 pt-5 border-2 border-t border-color">
                            <Button type="submit" variant="brand" disabled={isSubmitting || loadingAvatar} fullWidth size="md">
                                {isSubmitting ? 'Guardando...' : 'Guardar cambios'}
                            </Button>
                        </div>
                    </Form>
                </section>

                <section className="bg-surface p-3">
                    <Form onSubmit={handleSubmitPass(onChangePassword, () =>
                        setAlert({ tipo: 'error', mensaje: 'Revisá el campo de la contraseña.' })
                    )}>
                        <Legend>Seguridad</Legend>
                        <Input
                            label="Nueva contraseña:"
                            type="password"
                            placeholder="Mínimo 6 caracteres"
                            autoComplete="new-password"
                            error={errorsPass.password?.message}
                            required
                            {...registerPass('password')}
                        />
                        <div className="flex justify-center items-center gap-3 mt-5 pt-5 border-2 border-t border-color">
                            <Button type="submit" variant="brand" disabled={submittingPass} fullWidth size="md">
                                {submittingPass ? 'Actualizando...' : 'Cambiar contraseña'}
                            </Button>
                        </div>
                    </Form>
                </section>
            </div>
        </div>
    );
}
