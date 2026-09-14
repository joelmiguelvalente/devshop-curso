// src/pages/Home.jsx
import { Configuracion } from "@components/Configuracion";
import { Nosotros } from "@components/Nosotros";
import { Productos } from "@components/Productos/Productos";
import { Section } from "@ui/Section";

export const Home = () => {
    const secciones = Configuracion.sections;

    return (
        <>
            <Section {...secciones.destacados} />
            <Productos destacados={true} limite={4} />

            <Section {...secciones.productos} />
            <Productos destacados={false} limite={8} />

            <Section label="Nosotros" mensaje="Nosotros" submensaje="Presentación de nuestro equipo" />
            <Nosotros />
        </>
    )
}