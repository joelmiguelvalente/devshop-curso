// src/pages/admin/productos/ProductosForm.jsx
import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router';
import { useForm, useWatch } from 'react-hook-form';
import { COLECCION } from '@constants/collections';
// Componentes UI
import Image from '@ui/Image';
import { Alerta } from '@ui/Alerta';
import { Button } from '@ui/Button';
import { Form, Legend } from '@ui/Form';
import { Input, Textarea, Select } from '@ui/Inputs';
import { SubSection } from '@ui/Section';
// Hooks & Utilidades
import { normalizeTags } from '@utils/Utils';
import { useFirestoreQuery, useFirestoreDoc } from '@hooks/useFirestore';
import { useUpload } from '@hooks/useUpload';
import { createSchemaResolver } from '@utils/rhfResolver';
import { createDoc, patchDoc } from '@services/firestore.service';
import { productFieldDefault, productSchema } from '@schemas/productSchema';

export const ProductosForm = () => {

	// Hook
	const navigate = useNavigate();
	const { id: productID } = useParams();
	// Custom Hook
	const { data: documentToEdit, loading: loadingDoc }	= useFirestoreDoc(COLECCION.productos, productID);
	const { data: categories } = useFirestoreQuery(COLECCION.categorias, { order: ['name', 'asc'] });
	const {
		uploadImage,
		cargando: loadingImage,
		error: errorImagen
	} = useUpload();

	// Esta en modo editor o no?
	const modeEdit = !!productID;

	const {
		register,
		handleSubmit,
		reset,
		control,
		setValue,
		formState: {
			errors,
			isSubmitting
		}
	} = useForm({
		defaultValues: productFieldDefault,
		resolver: createSchemaResolver(productSchema),
		mode: 'onTouched'
	});

	// State
	const [alert, setAlert] = useState({ tipo: '', mensaje: '' });

	// Si estamos editando, cargar los datos del producto
	useEffect(() => {
		if (modeEdit && documentToEdit) {
			reset(documentToEdit);
		}
	}, [modeEdit, documentToEdit, reset]);

	const goBack = () => navigate('/admin/productos');
	const imageUrl = useWatch({ control, name: 'image' });
	// Select controlado: las categorías cargan async, así el valor se re-aplica cuando aparecen las options
	const categoryValue = useWatch({ control, name: 'category' });

	const handlerChangeImagen = async ({ target: { files } }) => {
		const file = files[0];
		if (!file) return;
		// uploadImage ya retorna la URL: la escribimos directo en RHF, sin efecto puente
		const url = await uploadImage(file);
		if (url) setValue('image', url, { shouldDirty: true, shouldValidate: true });
	};

	// handlerSendForm(onSubmit)
	const onSubmit = async (values) => {
		try {
			let message;
			// Sanitización: convertimos strings a números antes de enviar a Firebase
			const dataToSend = {
				...values,
				price:		Number(values.price),
				stock:		Number(values.stock),
				discount:	Number(values.discount) || 0,
				image:		values.image,
				tags:		normalizeTags(values),
				rating: {
					rate: 0,
					count: 0
				}
			};

			if (modeEdit) {
				await patchDoc(COLECCION.productos, productID, dataToSend);
				message = 'Se actualizó con éxito.';
			} else {
				await createDoc(COLECCION.productos, dataToSend);
				message = 'Se creó correctamente el producto.';
			}

			setAlert({ tipo: 'success', mensaje: message });
			goBack();

		} catch (error) {
			console.error("Error guardando producto:", error);
			setAlert({ tipo: 'error', mensaje: 'Hubo un error al guardar el producto.' });
		}
	};

	if (modeEdit && loadingDoc) {
		return <p className="text-center py-10">Cargando datos del producto...</p>;
	}

	const titleHeading	= (modeEdit ? 'Editar' : 'Agregar') + ' producto';
	const labelToButton = modeEdit ? 'Editar Producto' : 'Crear Producto';

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
			<SubSection label={titleHeading} linkTo="/admin/productos" linkLabel="Volver..." />
			<Form onSubmit={handleSubmit(onSubmit, () =>
				setAlert({ tipo: 'error', mensaje: 'Revisá los campos marcados.' })
			)}>
				<Legend>Administrar datos</Legend>
				<Input
					label="Nombre del Producto:"
					type="text"
					placeholder="Ej: Teclado Mecánico"
					error={errors.title?.message}
					required
					{...register('title')}
				/>
				<div className="grid grid-cols-3 gap-2">
					<Input
						label="Precio:"
						type="number"
						placeholder="Ej: 95"
						error={errors.price?.message}
						required
						{...register('price')}
					/>
					<Input
						label="Stock:"
						type="number"
						placeholder="Ej: 5"
						error={errors.stock?.message}
						required
						{...register('stock')}
					/>
					<Input
						label="Descuento:"
						type="number"
						placeholder="Ej: 10"
						error={errors.discount?.message}
						{...register('discount')}
					/>
				</div>
				<Textarea
					label="Extracto:"
					placeholder="Una pequeña descripción"
					error={errors.excerpt?.message}
					required
					{...register('excerpt')}
				/>
				<Textarea
					label="Descripción:"
					placeholder="Añada una descripción del producto"
					error={errors.description?.message}
					required
					{...register('description')}
				/>
				<Select
					label="Categoría:"
					name="category"
					placeholder="Selecciona una categoría"
					options={categories}
					value={categoryValue || ''}
					onChange={(e) => setValue('category', e.target.value, { shouldDirty: true, shouldValidate: true })}
					error={errors.category?.message}
					required
				/>
				<Input
					label="Etiquetas del Producto:"
					type="text"
					placeholder="Ej: teclado, mecanico, accesorio"
					error={errors.tags?.message}
					required
					{...register('tags')}
				/>
				<Input
					label="Destacado?"
					type="checkbox"
					error={errors.outstanding?.message}
					{...register('outstanding')}
				/>
				<Input
					label="Imagen:"
					type="file"
					name="image"
					onChange={handlerChangeImagen}
					error={errors.image?.message}
					key={imageUrl ? 'subida' : 'pendiente'}
				/>

				{loadingImage && <p className="text-sm text-muted">Subiendo imagen...</p>}
				{errorImagen && <p className="text-sm text-error">{errorImagen}</p>}
				{imageUrl && (
					<Image
						image={imageUrl}
						alt="Vista previa"
						cx="my-2 object-cover rounded-2"
						type="portada"
						size="180"
					/>
				)}

				<div className="flex justify-center items-center gap-3 mt-5 pt-5 border-2 border-t border-color">
					<Button type="submit" variant="brand" disabled={isSubmitting || loadingImage} fullWidth size="md">
						{isSubmitting ? 'Guardando...' : labelToButton}
					</Button>

					<Button type="button" onClick={goBack} variant="ghost" fullWidth size="md">
						Regresar
					</Button>
				</div>
			</Form>
		</>
	);
}
