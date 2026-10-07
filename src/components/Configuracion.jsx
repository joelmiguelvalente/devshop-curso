// /src/components/Configuracion.jsx

const currentYear = new Date().getFullYear();

export const Title = "DevShop";

const onlyUpper = Title.match(/[A-Z]/g);
export const brandShort = onlyUpper ? onlyUpper.join('') : '';

export const Configuracion = {
    heading: {
        text: "¡Bienvenidos a %s!",
        highlight: Title
    },
    subheading: {
        text: "Descubrí nuestra %s",
        highlight: "nueva colección"
    },
    sections: {
        destacados: {
            label: "Promociones destacadas",
            mensaje: `Tendencias Destacadas ${currentYear}`,
            submensaje: "Descubre los productos más destacados de nuestro sitio.",
            accion: {
                texto: "Ver destacados",
                enlace: "/destacados"
            }
        },
        productos: {
            label: "Promoción principal",
            mensaje: `Nuevas Tendencias ${currentYear}`,
            submensaje: "Descubre la colección de temporada con envíos gratis.",
            accion: {
                texto: "Ver Colección",
                enlace: "/productos"
            }
        }
    }
}