// /src/layout/Layout.jsx
import { useState, useEffect } from 'react';
import { Outlet } from 'react-router';
import { Sun, Moon } from 'lucide-react';
import { Title, Configuracion } from '@components/Configuracion';
import { Button } from '@ui/Button';
// Secciones
import Header from '@layout/global/Header';
import Navbar from '@layout/global/Navbar';
import { Footer } from '@layout/global/Footer';

const ToggleMode = () => {

    const modes = {
        l: 'light',
        d: 'dark',
        x: 'light'
    }
    const [theme, setTheme] = useState(() => localStorage.getItem('theme') || modes.x);
    const toggleTheme = () => setTheme(prevTheme => (prevTheme === modes.l ? modes.d : modes.l));

    useEffect(() => {
        document.documentElement.setAttribute('data-theme', (theme === modes.d ? modes.d : modes.l));
        localStorage.setItem('theme', theme);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [theme]);

    return (
        <div className="fixed bottom-1 right-1 z-99">
            <Button onClick={toggleTheme}>
                {theme === 'light' ? <Moon aria-hidden="true" /> : <Sun aria-hidden="true" />}
            </Button>
        </div>
    )
}

const createLayout = ({
    hero = false,
    footerLarge = false
}) => {
    const { brandShort, heading, subheading } = Configuracion;
    return (
        <>
            <Navbar brand={Title} brandShort={brandShort} />

            {hero && <Header short={brandShort} heading={heading} subheading={subheading} />}

            <main className={`container ${hero ? 'mb-3 pt-4' : 'mb-3 mt-8 pt-8'}`}>
                <Outlet />
            </main>

            <Footer brand={Title} isFull={footerLarge} />

            <ToggleMode />
        </>
    )
}

export const Layout         = () => createLayout({
    footerLarge: true
});

export const LayoutWithHero = () => createLayout({
    hero: true,
    footerLarge: true
});

export const LayoutSimple   = () => createLayout({
    hero: false,
    footerLarge: false
});