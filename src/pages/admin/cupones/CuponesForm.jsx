// src/pages/admin/cupones/CuponesForm.jsx
import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router';
import { useForm, useWatch } from 'react-hook-form';
import { COLECCION } from '@constants/collections';
// Componentes UI
import { Alerta } from '@ui/Alerta';
import { Button } from '@ui/Button';
import { Form, Legend } from '@ui/Form';
import { Input, Select } from '@ui/Inputs';
import { SubSection } from '@ui/Section';
// Hooks & Utilidades
import { useFirestoreDoc } from '@hooks/useFirestore';
import { alwaysUpper, formatDate } from '@utils/Utils';
import { createSchemaResolver } from '@utils/rhfResolver';
import { createDoc, patchDoc } from '@services/firestore.service';
import { couponFieldDefault, couponSchema } from '@schemas/couponSchema';

export function CuponesForm() {

    // Hook
    const navigate = useNavigate();
    const { id: couponID } = useParams();
    // Custom Hook
    const {
        data:    documentToEdit,
        loading: loadingDoc
    } = useFirestoreDoc(COLECCION.cupones, couponID);

    // Esta en modo editor o no?
    const modeEdit = !!couponID;

    const {
        register,
        handleSubmit,
        reset,
        control,
        formState: {
            errors,
            isSubmitting
        }
    } = useForm({
        defaultValues: couponFieldDefault,
        resolver: createSchemaResolver(couponSchema),
        mode: 'onTouched'
    });

    // State
    const [alert, setAlert] = useState({ tipo: '', mensaje: '' });

    // Si estamos editando, cargar los datos del cupón (fechas → string para los inputs date)
    useEffect(() => {
        if (modeEdit && documentToEdit) {
            reset({
                ...documentToEdit,
                startDate:      formatDate(documentToEdit.startDate),
                expirationDate: formatDate(documentToEdit.expirationDate)
            });
        }
    }, [modeEdit, documentToEdit, reset]);

    const goBack = () => navigate('/admin/cupones');

    // El tope máximo solo aplica a descuentos porcentuales
    const discountType = useWatch({ control, name: 'discountType' });

    // Código en mayúsculas en vivo (envolvemos el onChange de register)
    const codeField = register('code', { setValueAs: alwaysUpper });

    // handlerSendForm(onSubmit)
    const onSubmit = async (values) => {
        try {
            let message;
            // Sanitización: convertimos strings de fecha a Date nativos antes de enviar a Firebase
            const dataToSend = {
                ...values,
                startDate:          new Date(values.startDate),
                expirationDate:     new Date(values.expirationDate),
                discountValue:      Number(values.discountValue),
                minOrderAmount:     Number(values.minOrderAmount),
                maxDiscountAmount:  Number(values.maxDiscountAmount),
                code:               alwaysUpper(values.code)
            };
            //
            if (modeEdit) {
                await patchDoc(COLECCION.cupones, couponID, dataToSend);
                message = 'Se actualizó con éxito.';
            } else {
                await createDoc(COLECCION.cupones, dataToSend);
                message = 'Se creó correctamente el cupón.';
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
        return <p className="text-center py-10">Cargando datos del cupón...</p>;
    }

    const titleHeading  = (modeEdit ? 'Editar' : 'Agregar') + ' cupón';
    const labelToButton = modeEdit ? 'Editar Cupón' : 'Crear Cupón';

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
            <SubSection label={titleHeading} linkTo="/admin/cupones" linkLabel="Volver..." />
            <Form onSubmit={handleSubmit(onSubmit, () =>
                setAlert({ tipo: 'error', mensaje: 'Revisá los campos marcados.' })
            )}>
                <Legend>Información General del Cupón</Legend>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Input
                        label="Código del Cupón (Único):"
                        type="text"
                        placeholder="Ej: VERANO2026"
                        error={errors.code?.message}
                        disabled={modeEdit} // Evita romper consistencia si usas ID manuales
                        required
                        {...codeField}
                        onChange={(e) => {
                            e.target.value = e.target.value.toUpperCase();
                            codeField.onChange(e);
                        }}
                    />
                    <Input
                        label="Título Visible:"
                        type="text"
                        placeholder="Ej: Descuento de Temporada"
                        error={errors.title?.message}
                        required
                        {...register('title')}
                    />
                </div>

                <Input
                    label="Descripción de la Oferta:"
                    type="text"
                    placeholder="Ej: Obtén un 20% de descuento en ropa de playa..."
                    error={errors.description?.message}
                    required
                    {...register('description')}
                />

                <Legend className="mt-4">Reglas de Descuento</Legend>

                <Select
                    label="Tipo de Descuento:"
                    placeholder="Selecciona un tipo..."
                    options={[
                        { value: 'percentage',   label: 'Porcentaje (%)' },
                        { value: 'fixed_amount', label: 'Monto Fijo ($)' }
                    ]}
                    error={errors.discountType?.message}
                    required
                    {...register('discountType')}
                />

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Input
                        label="Valor del Descuento:"
                        type="number"
                        placeholder="Ej: 15"
                        error={errors.discountValue?.message}
                        required
                        {...register('discountValue')}
                    />
                    <Input
                        label="Compra Mínima Requerida ($):"
                        type="number"
                        placeholder="Ej: 50"
                        error={errors.minOrderAmount?.message}
                        {...register('minOrderAmount')}
                    />
                    <Input
                        label="Tope Máximo Descuento ($):"
                        type="number"
                        placeholder="Ej: 100 (Opcional)"
                        error={errors.maxDiscountAmount?.message}
                        disabled={discountType === 'fixed_amount'}
                        {...register('maxDiscountAmount')}
                    />
                </div>

                <Legend className="mt-4">Vigencia y Límites</Legend>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Input
                        label="Fecha de Inicio:"
                        type="date"
                        error={errors.startDate?.message}
                        required
                        {...register('startDate')}
                    />
                    <Input
                        label="Fecha de Vencimiento:"
                        type="date"
                        error={errors.expirationDate?.message}
                        required
                        {...register('expirationDate')}
                    />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Input
                        label="Límite Total de Usos (Plataforma):"
                        type="number"
                        placeholder="Ej: 500"
                        error={errors.usageLimit?.message}
                        required
                        {...register('usageLimit')}
                    />
                    <Input
                        label="Límite Máximo por Usuario:"
                        type="number"
                        placeholder="Ej: 1"
                        error={errors.perUserLimit?.message}
                        required
                        {...register('perUserLimit')}
                    />
                </div>

                <Input
                    type="checkbox"
                    label="Activar cupón inmediatamente para el público"
                    {...register('isActive')}
                />

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
