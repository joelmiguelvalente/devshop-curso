// /src/layout/Layout.jsx
import { Outlet } from "react-router";
import { Title, Configuracion } from "@components/Configuracion";
// Secciones
import Header from '@layout/parts/Header';
import Navbar from '@layout/parts/Navbar';
import Footer from '@layout/parts/Footer';

const Layout = ({ hero = false }) => {
    const { short, heading, subheading } = Configuracion;
    return (
        <>
            <Navbar brand={Title} brandShort={short} hero={hero} />
            {hero && (
                <Header short={short} heading={heading} subheading={subheading} />
            )}
            <main className={`container ${hero ? 'my-3' : 'mt-5 mb-3'}`}>
                <Outlet />
            </main>
            <Footer brand={Title} />
        </>
    );
}

export default Layout;