// src/pages/public/Home.jsx
import { Configuracion } from "@components/Configuracion";
import { Productos } from "@pages/public/Home/Productos";
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