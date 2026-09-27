// /src/layout/Layout.jsx
import { useState, useEffect } from 'react';
import { Outlet } from 'react-router';
import { Sun, Moon } from 'lucide-react';
import { Title, Configuracion } from '@components/Configuracion';
import { Button } from '@ui/Button';
// Secciones
import Header from '@layout/parts/Header';
import Navbar from '@layout/parts/Navbar';
import Footer from '@layout/parts/Footer';

const modes = {
    l: 'light',
    d: 'dark',
    x: 'light'
}

const Layout = ({ hero = false }) => {

    const [theme, setTheme] = useState(() => localStorage.getItem('theme') || modes.x);
    const toggleTheme = () => setTheme(prevTheme => (prevTheme === modes.l ? modes.d : modes.l));

    const { short, heading, subheading } = Configuracion;

    useEffect(() => {
        document.documentElement.setAttribute('data-theme', (theme === modes.d ? modes.d : modes.l));
        localStorage.setItem('theme', theme);
    }, [theme]);

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
            <div className="fixed bottom-1 right-1" style={{ zIndex: '99' }}>
                <Button onClick={toggleTheme}>
                    {theme === 'light' ? <Moon /> : <Sun />}
                </Button>
            </div>
        </>
    );
}

export default Layout;