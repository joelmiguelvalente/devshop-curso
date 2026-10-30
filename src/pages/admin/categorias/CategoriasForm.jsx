// src/pages/admin/categorias/CategoriasForm.jsx
import { useState, useEffect, useRef } from 'react';
// Librerias
import { useNavigate, useParams } from 'react-router';
import { useForm } from 'react-hook-form';
// Constante
import { COLECCION } from '@constants/collections';
// Componentes
import { Alerta } from '@ui/Alerta';
import { Button } from '@ui/Button';
import { Form, Legend } from '@ui/Form';
import { Input } from '@ui/Inputs';
import { SubSection } from '@ui/Section';
// Hook
import { useFirestoreDoc } from '@hooks/useFirestore';
// Utilidades
import { slugify } from '@utils/Utils';
import { createSchemaResolver } from '@utils/rhfResolver';
// Servicio
import { createDoc, patchDoc, findMany } from '@services/firestore.service';
// Esquema
import { categoryFieldDefault, categorySchema } from '@schemas/categorySchema';
// Otros
import { updateCategoryAndProductsBatch } from './CategoriasBatch';

export function CategoriasForm() {

    // Hook
    const navigate = useNavigate();
    const { id: categoriaID } = useParams();
    // Custom Hook
    const {
        data: documentToEdit,
        loading: loadingDoc
    } = useFirestoreDoc(COLECCION.categorias, categoriaID);

    // Esta en modo editor o no?
    const modeEdit = !!categoriaID;

    const {
        register,
        handleSubmit,
        reset,
        setValue,
        formState: {
            errors,
            isSubmitting
        }
    } = useForm({
        defaultValues: categoryFieldDefault,
        resolver: createSchemaResolver(categorySchema),
        mode: 'onTouched'
    });

    // State
    const [alert, setAlert] = useState({ tipo: '', mensaje: '' });

    // Si estamos editando, cargar los datos de la categoría
    useEffect(() => {
        if (modeEdit && documentToEdit) {
            reset(documentToEdit);
        }
    }, [modeEdit, documentToEdit, reset]);

    const goBack = () => navigate('/admin/categorias');

    // El slug se genera solo desde el nombre; después se puede ajustar a mano (solo al crear)
    const nameField = register('name');
    const slugField = register('slug');
    // Si el usuario edita el slug a mano al crear, dejamos de pisarlo con el nombre
    const slugManual = useRef(false);

    const handlerNombreChange = (e) => {
        nameField.onChange(e);
        if (modeEdit || !slugManual.current) {
            setValue('slug', slugify(e.target.value), { shouldValidate: true });
        }
    };

    const handlerSlugChange = (e) => {
        slugManual.current = true;
        slugField.onChange(e);
    };

    // handlerSendForm(onSubmit)
    const onSubmit = async (values) => {
        try {
            const dataToSend = {
                name: values.name.trim(),
                slug: slugify(values.slug)
            };

            // Un slug repetido rompería la relación con los productos
            const repetidas = await findMany(COLECCION.categorias, {
                filters: [['slug', '==', dataToSend.slug]]
            });
            if (repetidas.some(({ id }) => id !== categoriaID)) {
                setAlert({ tipo: 'error', mensaje: `Ya existe una categoría con el slug "${dataToSend.slug}".` });
                return;
            }

            let message;

            if (modeEdit) {
                const slugViejo = documentToEdit?.slug ?? '';
                const cambioSlug = Boolean(slugViejo) && slugViejo !== dataToSend.slug;

                if (cambioSlug) {
                    const cantidad = await updateCategoryAndProductsBatch(
                        categoriaID, dataToSend, slugViejo, dataToSend.slug
                    );
                    message = cantidad > 0
                        ? `Categoría actualizada y ${cantidad} producto${cantidad === 1 ? '' : 's'} reasignado${cantidad === 1 ? '' : 's'} a "${dataToSend.slug}".`
                        : 'Categoría actualizada. No había productos con el slug anterior.';
                } else {
                    await patchDoc(COLECCION.categorias, categoriaID, dataToSend);
                    message = 'Se actualizó con éxito.';
                }
            } else {
                await createDoc(COLECCION.categorias, dataToSend);
                message = 'Se creó correctamente la categoría.';
            }

            // Mostramos alerta y navegamos
            setAlert({ tipo: 'success', mensaje: message });
            goBack();

        } catch (err) {
            console.error(err);
            setAlert({
                tipo: 'error',
                mensaje: 'Hubo un error. Por favor, intentá de nuevo.'
            });
        }
    };

    if (modeEdit && loadingDoc) {
        return <p className="text-center py-10">Cargando datos de la categoría...</p>;
    }

    const titleHeading  = (modeEdit ? 'Editar' : 'Agregar') + ' categoría';
    const labelToButton = modeEdit ? 'Editar Categoría' : 'Crear Categoría';

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
            <SubSection label={titleHeading} linkTo="/admin/categorias" linkLabel="Volver..." />
            <Form onSubmit={handleSubmit(onSubmit, () =>
                setAlert({ tipo: 'error', mensaje: 'Revisá los campos marcados.' })
            )}>
                <Legend>Información de la categoría</Legend>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Input
                        label="Nombre:"
                        type="text"
                        placeholder="Ej: Accesorios Gamer"
                        error={errors.name?.message}
                        required
                        autoComplete="off"
                        {...nameField}
                        onChange={handlerNombreChange}
                    />
                    <Input
                        label="Slug (SEO):"
                        type="text"
                        placeholder="Ej: accesorios-gamer"
                        error={errors.slug?.message}
                        required
                        autoComplete="off"
                        readOnly={modeEdit}
                        {...slugField}
                        onChange={handlerSlugChange}
                    />
                </div>

                <p className="text-sm text-muted mb-4 pr-2 pl-2">
                    {modeEdit
                        ? 'El slug no se puede editar: se actualiza automáticamente según el nombre.'
                        : 'El slug se genera desde el nombre, pero podés ajustarlo antes de crear la categoría.'}
                </p>

                <div className="flex justify-center items-center gap-3 mt-5 pt-5 border-2 border-t border-color">
                    <Button type="submit" variant="brand" disabled={isSubmitting} fullWidth size="md">
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
