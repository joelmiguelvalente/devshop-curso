// src/hooks/useAvatar.jsx
// Utilidades
import { getSizeImage, AVATAR_MIN, AVATAR_MAX } from '@utils/Avatar';
// Hook
import { useUpload } from '@hooks/useUpload';

/**
 * Logica de subida de avatar (ImgBB) reutilizable entre formularios.
 * Recibe los metodos de react-hook-form que necesita para setear errores y el valor.
 * @param {Object}  form - { setError, clearErrors, setValue } del useForm
 */
export function useAvatarUpload({ setError, clearErrors, setValue }) {
    const { uploadImage, cargando, error } = useUpload();

    const handlerChangeAvatar = async ({ target }) => {
        const file = target.files?.[0];
        if (!file) return;
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
        // Dimensiones validas: recien ahi se sube (evita gastar subidas en archivos rechazados)
        const url = await uploadImage(file);
        if (url) {
            setValue('avatar', url, { shouldDirty: true, shouldValidate: true });
            clearErrors('avatar');
        } else {
            setError('avatar', { type: 'manual', message: 'No se pudo subir el avatar. Intentá de nuevo.' });
        }
    };

    return { handlerChangeAvatar, loadingAvatar: cargando, errorAvatar: error };
}
