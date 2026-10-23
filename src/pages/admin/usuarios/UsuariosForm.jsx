// src/pages/admin/usuarios/UsuariosForm.jsx
import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router';
import { useForm, useWatch } from 'react-hook-form';
import { COLECCION } from '@constants/collections';
// Componentes UI
import Image from '@ui/Image';
import { Alerta } from '@ui/Alerta';
import { Button } from '@ui/Button';
import { Form, Legend } from '@ui/Form';
import { Input } from '@ui/Inputs';
import { SubSection } from '@ui/Section';
// Hooks & Utilidades
import { useUpload } from '@hooks/useUpload';
import { useFirestoreDoc } from '@hooks/useFirestore';
import { getSizeImage, AVATAR_MIN, AVATAR_MAX } from '@utils/Avatar';
import { createSchemaResolver } from '@utils/rhfResolver';
import { createDoc, patchDoc } from '@services/firestore.service';
import { userFieldDefault, userSchema } from '@schemas/userSchema';

export function UsuariosForm() {

	// Hook
	const navigate = useNavigate();
	const { uid: userID } = useParams();
	// Custom Hook
	const { data: documentToEdit, loading: loadingDoc } = useFirestoreDoc(COLECCION.usuarios, userID);
	const { uploadImage, cargando: loadingAvatar, error: errorAvatar } = useUpload();

    const modeEdit = !!userID;

    const {
    	register,
    	handleSubmit,
    	reset,
        control,
        setValue,
        setError,
        clearErrors,
        formState: {
        	errors,
        	isSubmitting
        }
    } = useForm({
        defaultValues:	userFieldDefault,
        resolver: createSchemaResolver(userSchema),
        mode: 'onTouched'
    });

	// State
	const [alert, setAlert] = useState({ tipo: '', mensaje: '' });


	// Si estamos editando, cargar los datos del usuario
	useEffect(() => {
		if (modeEdit && documentToEdit) {
			reset(documentToEdit);
		}
	}, [modeEdit, documentToEdit, reset]);

	const goBack = () => navigate('/admin/usuarios');
	const avatarUrl = useWatch({ control, name: 'avatar' });

	// handlerChangeAvatar
	const handlerChangeAvatar = async ({ target }) => {
		const file = target.files?.[0];
		if (!file) return;
		setAlert({ tipo: '', mensaje: '' });
		clearErrors('avatar');
		if (!file.type.startsWith('image/')) {
            target.value = '';
            setError('avatar', { type: 'manual', message: 'El archivo debe ser una imagen.' });
            return;
		}
		try {
			const { width, height } = await getSizeImage(file);
			if (width < AVATAR_MIN || height < AVATAR_MIN || width > AVATAR_MAX || height > AVATAR_MAX) {
				target.value = '';
				setError('avatar', { type: 'manual', message: `El avatar debe medir entre ${AVATAR_MIN} y ${AVATAR_MAX} px por lado (actual: ${width}x${height}).` });
				return;
			}
		} catch {
			target.value = '';
			setError('avatar', { type: 'manual', message: 'No se pudo leer la imagen.' });
			return;
		}
		// Dimensiones válidas: recién ahí se sube (evita gastar subidas en archivos rechazados)
		const url = await uploadImage(file);
		if (url) {
			setValue('avatar', url, { shouldDirty: true, shouldValidate: true });
			clearErrors('avatar');
		} else {
			setError('avatar', { type: 'manual', message: 'No se pudo subir el avatar. Intentá de nuevo.' });
		}
	};

	// handlerSendForm(onSubmit)
	const onSubmit = async (values) => {
        try {
            let message;
            if (modeEdit) {
                await patchDoc(COLECCION.usuarios, userID, values);
                message = 'Se actualizó con éxito.';
            } else {
                await createDoc(COLECCION.usuarios, values);
                message = 'Se creó correctamente el usuario.';
            }
            setAlert({ tipo: 'success', mensaje: message });
            goBack();
        } catch (err) {
            console.error(err);
            setAlert({ tipo: 'error', mensaje: 'Hubo un error. Por favor, intentá de nuevo.' });
        }
    };

    if (modeEdit && loadingDoc) {
        return <p className="text-center py-10">Cargando datos del producto...</p>;
    }

	const titleHeading 	= (modeEdit ? 'Editar' : 'Agregar') + ' usuario';
	const labelToButton = modeEdit ? 'Editar Usuario' : 'Crear Usuario'

	return (
		<>
			{alert.mensaje && (
				<div className="mb-3">
					<Alerta
						type={alert.tipo}
						message={alert.mensaje}
						onClose={() => setAlert({ tipo: '', mensaje: '' })}
					/>
				</div>
			)}
			<SubSection label={titleHeading} linkTo="/admin/usuarios" linkLabel="Volver..." />
			<Form onSubmit={handleSubmit(onSubmit, () =>
                setAlert({ tipo: 'error', mensaje: 'Revisá los campos marcados.' })
            )}>
				<Legend>Administrar datos</Legend>
				<Input
                    label="Nombre del Usuario:"
                    type="text"
                    placeholder="Ej: Jhon Doe"
                    error={errors.name?.message}
                    required
                    {...register('name')}
                />
				<Input
                    label="Email:"
                    type="email"
                    placeholder="Ej: jhondoe@example.com"
                    error={errors.email?.message}
                    required
                    {...register('email')}
                />
                <Input
                    label="Label:"
                    type="text"
                    placeholder="Ej: UI/UX Designer"
                    error={errors.label?.message}
                    required
                    {...register('label')}
                />
				<Input
                    label="Rol:"
                    type="text"
                    placeholder="Ej: Administrador"
                    error={errors.rol?.message}
                    required
                    {...register('rol')}
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
	                    {isSubmitting ? 'Procesando...' : labelToButton}
	                </Button>

	                <Button type="button" onClick={goBack} variant="ghost" fullWidth size="md">
	                    Regresar
	                </Button>
	            </div>
			</Form>
		</>
	);
}
