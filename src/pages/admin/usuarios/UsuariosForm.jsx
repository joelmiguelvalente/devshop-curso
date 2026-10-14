// src/pages/admin/usuarios/UsuariosForm.jsx
import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router';
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
import { validarFormulario } from '@utils/Validate';
import { createDoc, patchDoc } from '@services/firestore.service';
import { userFieldDefault, userSchema } from '@schemas/userSchema';

export function UsuariosForm() {

	// Nombre de la colección!
	const collection                    = 'team';

	// Hook
	const navigate                      = useNavigate();
	const { uid: userID }				= useParams();
	// Custom Hook
	const {
		data: documentToEdit,
		loading: loadingDoc
	}   								= useFirestoreDoc(collection, userID);
	const {
		uploadImage,
		cargando: 	loadingAvatar,
		error: 		errorAvatar
	} 									= useUpload();
	// State
	const [errors, setErrors]         	= useState({});
	const [alert, setAlert]            	= useState({ tipo: '', mensaje: '' });
	const [loading, setLoading]       	= useState(false);
	const [formData, setFormData]     	= useState(userFieldDefault);

	// Esta en modo editor o no?
	const modeEdit = !!userID;

	// Si estamos editando, cargar los datos del usuario
	useEffect(() => {
		if (modeEdit && documentToEdit) {
			// eslint-disable-next-line react-hooks/set-state-in-effect
			setFormData(documentToEdit);
		}
	}, [modeEdit, documentToEdit]);

	// handlerChange
	const handlerChange = ({ target: { name, value } }) => {
		setFormData({ ...formData, [name]: value });
		setErrors((prev) => ({ ...prev, [name]: undefined }));
	};

	// handlerChangeAvatar
	const handlerChangeAvatar = async ({ target }) => {
		const file = target.files?.[0];
		if (!file) return;
		setAlert({ tipo: '', mensaje: '' });
		if (!file.type.startsWith('image/')) {
			target.value = '';
			setErrors((prev) => ({ ...prev, avatar: 'El archivo debe ser una imagen.' }));
			return;
		}
		try {
			const { width, height } = await getSizeImage(file);
			if (width < AVATAR_MIN || height < AVATAR_MIN || width > AVATAR_MAX || height > AVATAR_MAX) {
				target.value = '';
				setErrors((prev) => ({
					...prev,
					avatar: `El avatar debe medir entre ${AVATAR_MIN} y ${AVATAR_MAX} px por lado (actual: ${width}x${height}).`
				}));
				return;
			}
		} catch {
			target.value = '';
			setErrors((prev) => ({ ...prev, avatar: 'No se pudo leer la imagen.' }));
			return;
		}
		// Dimensiones válidas: recién ahí se sube (evita gastar subidas en archivos rechazados)
		const url = await uploadImage(file);
		if (url) {
			setFormData((prev) => ({ ...prev, avatar: url }));
			setErrors((prev) => ({ ...prev, avatar: undefined }));
		} else {
			setErrors((prev) => ({ ...prev, avatar: 'No se pudo subir el avatar. Intentá de nuevo.' }));
		}
	};

	// handlerSendForm
	const handlerSendForm = async (evento) => {
		evento.preventDefault();

        // Nuevo cambio en las válidaciones
        const errorsValidator = validarFormulario(formData, userSchema);
        if (Object.keys(errorsValidator).length > 0) {
            setErrors(errorsValidator);
            return;
        }

		setLoading(true);

		try {
			let message;
			//
			if (modeEdit) {
				await patchDoc(collection, userID, formData);
				message = 'Se actualizó con exitó.';
			} else {
				await createDoc(collection, formData);
				message = 'Se creó correctamente el usuario.';
			}

            // Mostramos alerta y navegamos
			setAlert({ tipo: 'success', mensaje: message });
			navigate('/admin/usuarios');

		} catch (err) {
			console.error(err);
			setAlert({ tipo: 'error', mensaje: 'Hubo un error. Por favor, intentá de nuevo.' });
		} finally {
            // Reseteamos
            setLoading(false);
            setErrors({});
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
			<Form onSubmit={handlerSendForm}>
				<Legend>Administrar datos</Legend>
				<Input
					label="Nombre del Usuario:"
					type="text"
					name="name"
					placeholder="Ej: Jhon Doe"
					value={formData.name}
					onChange={handlerChange}
					error={errors.name}
					required
				/>
				<Input
					label="Email:"
					type="email"
					name="email"
					placeholder="Ej: jhondoe@example.com"
					value={formData.email}
					onChange={handlerChange}
					error={errors.email}
					required
				/>
				<Input
					label="Rol:"
					type="text"
					name="role"
					placeholder="Ej: Administrador"
					value={formData.role}
					onChange={handlerChange}
					error={errors.role}
					required
				/>
				<Input
					label="Avatar (120 a 350 px por lado):"
					type="file"
					name="avatar"
					onChange={handlerChangeAvatar}
					error={errors.avatar}
					key={formData.avatar ? 'subido' : 'pendiente'}
				/>

				{loadingAvatar && <p className="text-sm text-muted">Subiendo avatar...</p>}
				{errorAvatar && <p className="text-sm text-error">{errorAvatar}</p>}
				{formData.avatar && (
					<Image
						image={formData.avatar}
						alt="Vista previa del avatar"
						cx="my-2 rounded-full"
						type="avatar"
						size="120"
					/>
				)}

				<Button type="submit" variant="brand" disabled={loading || loadingAvatar} fullWidth size="md">
					{loading ? 'Procesando...' : labelToButton}
				</Button>
			</Form>
		</>
	);
}
