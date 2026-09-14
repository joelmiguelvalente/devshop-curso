// /src/components/Configuracion.jsx

export const Title = "DevShop";

export const Configuracion = {
    title: Title,
    short: "DS",
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
            mensaje: "Tendencias Destacadas 2026",
            submensaje: "Descubre los productos más destacados de nuestro sitio.",
            accion: {
                texto: "Ver destacados",
                enlace: "/destacados"
            }
        },
        productos: {
            label: "Promoción principal",
            mensaje: "Nuevas Tendencias 2026",
            submensaje: "Descubre la colección de temporada con envíos gratis.",
            accion: {
                texto: "Ver Colección",
                enlace: "/nueva-coleccion"
            }
        }
    }
}