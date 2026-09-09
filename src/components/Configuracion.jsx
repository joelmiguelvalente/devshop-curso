// /src/components/Configuracion.jsx

export const Title = "DevShop";

export const Configuracion = {
    title: Title,
    short: "DS",
    heading: { text: "¡Bienvenidos a %s!", highlight: Title },
    subheading: { text: "Descubrí nuestra %s", highlight: "nueva colección" },
    sections: {
        destacados: {
            label: "Promociones destacadas",
            mensaje: "Tendencias Destacadas 2026",
            ctaText: "Ver destacados",
            ctaLink: "/destacados",
            destacados: true
        },
        productos: {
            label: "Promoción principal",
            mensaje: "Nuevas Tendencias 2026",
            submensaje: "Descubre la colección de temporada con envíos gratis.",
            ctaText: "Ver Colección",
            ctaLink: "/nueva-coleccion",
            destacados: false
        }
    }
}