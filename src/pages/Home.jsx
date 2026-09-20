// src/pages/Home.jsx
import { Configuracion } from "@components/Configuracion";
import { Productos } from "@components/Productos/Productos";
import { Section } from "@ui/Section";

export const Home = () => {
    const secciones = Configuracion.sections;

    return (
        <>
            <Section {...secciones.destacados} />
            <Productos destacados={true} limite={4} />
            <br />
            <Section {...secciones.productos} />
            <Productos destacados={false} limite={8} />

        </>
    )
}