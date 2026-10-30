// src/utils/Avatar.jsx
export const AVATAR_MIN = 120;
export const AVATAR_MAX = 350;

// Avatar aleatorio (ilustración) a partir de una semilla, ej: el uid del usuario
export const getRandomAvatar = (seed, estilo = 'adventurer') =>
    `https://api.dicebear.com/9.x/${estilo}/svg?seed=${encodeURIComponent(seed)}&backgroundColor=b6e3f4,c0aede,d1d4f9,ffdfbf`;

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
