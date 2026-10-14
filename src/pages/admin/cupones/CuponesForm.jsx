// src/pages/admin/cupones/CuponesForm.jsx
import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router';
// Componentes UI
import { Alerta } from '@ui/Alerta';
import { Button } from '@ui/Button';
import { Form, Legend } from '@ui/Form';
import { Input } from '@ui/Inputs';
import { SubSection } from '@ui/Section';
// Hooks & Utilidades
import { useFirestoreDoc } from '@hooks/useFirestore';
import { alwaysUpper, formatDate } from '@utils/Utils';
import { validarFormulario } from '@utils/Validate';
import { createDoc, patchDoc } from '@services/firestore.service';
import { couponFieldDefault, couponSchema } from '@schemas/couponSchema';

export function CuponesForm() {

    // Nombre de la colección!
    const collection                = 'coupons';

    // Hook
    const navigate                  = useNavigate();
    const { id: couponID }          = useParams();
    // Custom Hook
    const {
        data: documentToEdit,
        loading: loadingDoc
    }                               = useFirestoreDoc(collection, couponID);
    // State
    const [errors, setErrors]       = useState({});
    const [alert, setAlert]         = useState({ tipo: '', mensaje: '' });
    const [loading, setLoading]     = useState(false);
    const [formData, setFormData]   = useState(couponFieldDefault);

    // Esta en modo editor o no?
    const modeEdit = !!couponID;

    // Si estamos editando, cargar los datos del usuario
    useEffect(() => {
        if (modeEdit && documentToEdit) {
            // eslint-disable-next-line react-hooks/set-state-in-effect
            setFormData({
                ...documentToEdit,
                startDate:      formatDate(documentToEdit.startDate),
                expirationDate: formatDate(documentToEdit.expirationDate)
            });
        }
    }, [modeEdit, documentToEdit]);

    // handlerChange
    const handlerChange = ({ target: { name, value, type, checked } }) => {
        let valorFinal = value;
        // Conversión automática de tipos según el input
        if (type === 'checkbox') valorFinal     = checked;
        else if (type === 'number') valorFinal  = (value === '') ? 0 : Number(value);
        setFormData({ ...formData, [name]: valorFinal });
        setErrors((prev) => ({ ...prev, [name]: undefined }));
    };

    // handlerSendForm
    const handlerSendForm = async (evento) => {
        evento.preventDefault();

        // Nuevo cambio en las válidaciones
        const errorsValidator = validarFormulario(formData, couponSchema);
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
                startDate:      new Date(formData.startDate),
                expirationDate: new Date(formData.expirationDate),
                code:           alwaysUpper(formData.code)
            };
            //
            if (modeEdit) {
                await patchDoc(collection, couponID, dataToSend);
                message = 'Se actualizó con éxito.';
            } else {
                await createDoc(collection, dataToSend);
                message = 'Se creó correctamente el cupón.';
            }

            // Mostramos alerta y navegamos
            setAlert({ tipo: 'success', mensaje: message });
            navigate('/admin/cupones');

        } catch (err) {
            console.error(err);
            setAlert({
                tipo: 'error',
                mensaje: 'Hubo un error. Por favor, intentá de nuevo.'
            });
        } finally {
            // Reseteamos
            setLoading(false);
            setErrors({});
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
            <Form onSubmit={handlerSendForm}>
                <Legend>Información General del Cupón</Legend>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Input
                        label="Código del Cupón (Único):"
                        type="text"
                        name="code"
                        placeholder="Ej: VERANO2026"
                        value={formData.code}
                        onChange={(e) => {
                            e.target.value = e.target.value.toUpperCase();
                            handlerChange(e);
                        }}
                        error={errors.code}
                        disabled={modeEdit} // Evita romper consistencia si usas ID manuales
                        required
                    />
                    <Input
                        label="Título Visible:"
                        type="text"
                        name="title"
                        placeholder="Ej: Descuento de Temporada"
                        value={formData.title}
                        onChange={handlerChange}
                        error={errors.title}
                        required
                    />
                </div>

                <Input
                    label="Descripción de la Oferta:"
                    type="text"
                    name="description"
                    placeholder="Ej: Obtén un 20% de descuento en ropa de playa..."
                    value={formData.description}
                    onChange={handlerChange}
                    error={errors.description}
                    required
                />

                <Legend className="mt-4">Reglas de Descuento</Legend>

                <div className="flex flex-col mb-4">
                    <label className="text-sm font-medium mb-1">Tipo de Descuento:</label>
                    <select
                        name="discountType"
                        value={formData.discountType}
                        onChange={handlerChange}
                        className="p-2 border bg-background rounded text-sm cursor-pointer w-full"
                    >
                        <option value="">Selecciona un tipo...</option>
                        <option value="percentage">Porcentaje (%)</option>
                        <option value="fixed_amount">Monto Fijo ($)</option>
                    </select>
                    {errors.discountType && <span className="text-xs text-error mt-1">{errors.discountType}</span>}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Input
                        label="Valor del Descuento:"
                        type="number"
                        name="discountValue"
                        placeholder="Ej: 15"
                        value={formData.discountValue}
                        onChange={handlerChange}
                        error={errors.discountValue}
                        required
                    />
                    <Input
                        label="Compra Mínima Requerida ($):"
                        type="number"
                        name="minOrderAmount"
                        placeholder="Ej: 50"
                        value={formData.minOrderAmount}
                        onChange={handlerChange}
                        error={errors.minOrderAmount}
                    />
                    <Input
                        label="Tope Máximo Descuento ($):"
                        type="number"
                        name="maxDiscountAmount"
                        placeholder="Ej: 100 (Opcional)"
                        value={formData.maxDiscountAmount}
                        onChange={handlerChange}
                        error={errors.maxDiscountAmount}
                        disabled={formData.discountType === 'fixed_amount'}
                    />
                </div>

                <Legend className="mt-4">Vigencia y Límites</Legend>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Input
                        label="Fecha de Inicio:"
                        type="date"
                        name="startDate"
                        value={formData.startDate}
                        onChange={handlerChange}
                        error={errors.startDate}
                        required
                    />
                    <Input
                        label="Fecha de Vencimiento:"
                        type="date"
                        name="expirationDate"
                        value={formData.expirationDate}
                        onChange={handlerChange}
                        error={errors.expirationDate}
                        required
                    />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Input
                        label="Límite Total de Usos (Plataforma):"
                        type="number"
                        name="usageLimit"
                        placeholder="Ej: 500"
                        value={formData.usageLimit}
                        onChange={handlerChange}
                        error={errors.usageLimit}
                        required
                    />
                    <Input
                        label="Límite Máximo por Usuario:"
                        type="number"
                        name="perUserLimit"
                        placeholder="Ej: 1"
                        value={formData.perUserLimit}
                        onChange={handlerChange}
                        error={errors.perUserLimit}
                        required
                    />
                </div>

                <div className="flex items-center gap-2 py-3">
                    <input
                        type="checkbox"
                        id="isActive"
                        name="isActive"
                        checked={formData.isActive}
                        onChange={handlerChange}
                        className="w-4 h-4 cursor-pointer"
                    />
                    <label htmlFor="isActive" className="text-sm font-medium cursor-pointer">
                        Activar cupón inmediatamente para el público
                    </label>
                </div>

                <Button type="submit" variant="brand" disabled={loading} fullWidth size="md">
                    {loading ? 'Procesando...' : labelToButton}
                </Button>
            </Form>
        </>
    );
}
