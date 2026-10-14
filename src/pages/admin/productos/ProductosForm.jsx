// src/pages/admin/productos/ProductosForm.jsx
import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router';
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
import { validarFormulario } from '@utils/Validate';
import { createDoc, patchDoc } from '@services/firestore.service';
import { productFieldDefault, productSchema } from '@schemas/productSchema';

export const ProductosForm = () => {

	// Nombre de la colección!
	const collection				= 'products';

	// Hook
	const navigate					= useNavigate();
	const { id: productID }			= useParams();
	// Custom Hook
	const {
		data: documentToEdit,
		loading: loadingDoc
	}								= useFirestoreDoc(collection, productID);
	const { data: categories }		= useFirestoreQuery('categories', { order: ['name', 'asc'] });
	const {
		uploadImage,
		cargando: 	loadingImage,
		error: 		errorImagen
	}								= useUpload();
	// State
	const [errors, setErrors]		= useState({});
	const [alert, setAlert]			= useState({ tipo: '', mensaje: '' });
	const [loading, setLoading]		= useState(false);
	const [formData, setFormData]	= useState(productFieldDefault);

	// Esta en modo editor o no?
	const modeEdit = !!productID;

	// Si estamos editando, cargar los datos del producto
    useEffect(() => {
        if (modeEdit && documentToEdit) {
            // eslint-disable-next-line react-hooks/set-state-in-effect
            setFormData(documentToEdit);
        }
    }, [modeEdit, documentToEdit]);

    // handlerChange
	const handlerChange = ({ target: { name, value, type, checked } }) => {
		setFormData({ ...formData, [name]: type === 'checkbox' ? checked : value });
		setErrors((prev) => ({ ...prev, [name]: undefined }));
	};

	const handlerChangeImagen = async ({ target: { files } }) => {
		const file = files[0];
		if (!file) return;
		// uploadImage ya retorna la URL: actualizamos directo, sin efecto puente
		const url = await uploadImage(file);
		if (url) setFormData(prev => ({ ...prev, image: url }));
	};

	const handlerSendForm = async (evento) => {
		evento.preventDefault();

        // Nuevo cambio en las válidaciones
        const errorsValidator = validarFormulario(formData, productSchema);
        if (Object.keys(errorsValidator).length > 0) {
            setErrors(errorsValidator);
            return;
        }

        setLoading(true);

		try {
            let message;
            // Sanitización: convertimos strings de fecha a Date nativos antes de enviar a Firebase
            const dataToSend = {
                ...formData,
                price: Number(formData.price),
				stock: Number(formData.stock),
				discount: Number(formData.discount) || 0,
				image: formData.image,
				tags: normalizeTags(formData.tags),
				rating: {
					rate: 0,
					count: 0
				}
            };

			if (modeEdit) {
				await patchDoc(collection, productID, dataToSend);
                message = 'Se actualizó con éxito.';
			} else {
				await createDoc(collection, dataToSend);
                message = 'Se creó correctamente el producto.';
			}

            // Mostramos alerta y navegamos
            setAlert({ tipo: 'success', mensaje: message });
			navigate('/admin/productos');

		} catch (error) {
			console.error("Error guardando producto:", error);
			setAlert({ tipo: 'error', mensaje: 'Hubo un error al guardar el producto.' });
		} finally {
            // Reseteamos
            setLoading(false);
            setErrors({});
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
			<Form onSubmit={handlerSendForm}>
				<Legend>Administrar datos</Legend>
				<Input
					label="Nombre del Producto:"
					type="text"
					name="title"
					placeholder="Ej: Teclado Mecánico"
					value={formData.title}
					onChange={handlerChange}
					error={errors.title}
					required
				/>
				<div className="grid grid-cols-3 gap-2">
					<Input
						label="Precio:"
						type="number"
						name="price"
						placeholder="Ej: 95"
						value={formData.price}
						onChange={handlerChange}
						error={errors.price}
						required
					/>
					<Input
						label="Stock:"
						type="number"
						name="stock"
						placeholder="Ej: 5"
						value={formData.stock}
						onChange={handlerChange}
						error={errors.stock}
						required
					/>
					<Input
						label="Descuento:"
						type="number"
						name="discount"
						placeholder="Ej: 10"
						value={formData.discount}
						onChange={handlerChange}
						error={errors.discount}
					/>
				</div>
				<Textarea
					label="Extracto:"
					name="excerpt"
					placeholder="Una pequeña descripción"
					value={formData.excerpt}
					onChange={handlerChange}
					error={errors.excerpt}
				/>
				<Textarea
					label="Descripción:"
					name="description"
					placeholder="Añada una descripción del producto"
					value={formData.description}
					onChange={handlerChange}
					error={errors.description}
				/>
				<Select
					label="Categoría:"
					name="category"
					placeholder="Selecciona una categoría"
					value={formData.category}
					onChange={handlerChange}
					options={categories}
					error={errors.category}
				/>
				<Input
					label="Etiquetas del Producto:"
					type="text"
					name="tags"
					placeholder="Ej: teclado, mecanico, accesorio"
					value={formData.tags}
					onChange={handlerChange}
					error={errors.tags}
					required
				/>
				<Input
					label="Destacado?"
					type="checkbox"
					name="outstanding"
					value={formData.outstanding}
					onChange={handlerChange}
					error={errors.outstanding}
				/>
				<Input
					label="Imagen:"
					type="file"
					name="image"
					onChange={handlerChangeImagen}
					key={formData.image ? 'subida' : 'pendiente'}
				/>

				{loadingImage && <p className="text-sm text-muted">Subiendo imagen...</p>}
				{errorImagen && <p className="text-sm text-error">{errorImagen}</p>}
				{formData.image && (
					<Image
						image={formData.image}
						alt="Vista previa"
						cx="my-2 object-cover rounded-2"
						type="portada"
						size="180"
					/>
				)}

				<Button type="submit" variant="brand" disabled={loading || loadingImage} fullWidth size="md">
					{loading ? 'Guardando...' : labelToButton}
				</Button>
			</Form>
		</>
	);
}