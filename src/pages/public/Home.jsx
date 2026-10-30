// src/pages/public/Home.jsx
// Constante
import { Configuracion } from '@constants/configuration';
// Componente
import { Section } from '@ui/Section';
// Seccion
import { Productos } from '@pages/public/Home/Productos';

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