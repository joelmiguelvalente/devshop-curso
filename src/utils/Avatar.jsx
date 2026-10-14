export const AVATAR_MIN = 120;
export const AVATAR_MAX = 350;

export const getSizeImage = (file) => new Promise((resolve, reject) => {
    const url = URL.createObjectURL(file);
    const img = new window.Image();
    img.onload = () => {
        URL.revokeObjectURL(url);
        resolve({ width: img.naturalWidth, height: img.naturalHeight });
    };
    img.onerror = () => {
        URL.revokeObjectURL(url);
        reject(new Error('No se pudo leer la imagen.'));
    };
    img.src = url;
});
