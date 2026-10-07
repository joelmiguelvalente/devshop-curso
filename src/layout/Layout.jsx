// /src/layout/Layout.jsx
import { useState, useEffect } from 'react';
import { Outlet } from 'react-router';
import { Sun, Moon } from 'lucide-react';
import { Title, Configuracion } from '@components/Configuracion';
import { Button } from '@ui/Button';
// Secciones
import Header from '@layout/global/Header';
import Navbar from '@layout/global/Navbar';
import Footer from '@layout/global/Footer';

const modes = {
    l: 'light',
    d: 'dark',
    x: 'light'
}

const Layout = ({ hero = false }) => {

    const [theme, setTheme] = useState(() => localStorage.getItem('theme') || modes.x);
    const toggleTheme = () => setTheme(prevTheme => (prevTheme === modes.l ? modes.d : modes.l));

    const { brandShort, heading, subheading } = Configuracion;

    useEffect(() => {
        document.documentElement.setAttribute('data-theme', (theme === modes.d ? modes.d : modes.l));
        localStorage.setItem('theme', theme);
    }, [theme]);

    return (
        <>
            <Navbar brand={Title} brandShort={brandShort} />
            {hero && (
                <Header short={brandShort} heading={heading} subheading={subheading} />
            )}
            <main className={`container ${hero ? 'mt-5 mb-3' : 'without-hero mb-3'}`}>
                <Outlet />
            </main>
            <Footer brand={Title} />
            <div className="fixed bottom-1 right-1" style={{ zIndex: '99' }}>
                <Button onClick={toggleTheme}>
                    {theme === 'light' ? <Moon aria-hidden="true" /> : <Sun aria-hidden="true" />}
                </Button>
            </div>
        </>
    );
}

export default Layout;