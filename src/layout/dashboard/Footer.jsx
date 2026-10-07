// src/layout/dashboard/Footer.jsx
import { useState, useEffect } from 'react';
import { Sun, Moon } from 'lucide-react';
import { Button } from '@ui/Button';
import { Title } from '@components/Configuracion';

const modes = {
    l: 'light',
    d: 'dark',
    x: 'light'
}

const Footer = () => {

    const [theme, setTheme] = useState(() => localStorage.getItem('theme') || modes.x);
    const toggleTheme = () => setTheme(prevTheme => (prevTheme === modes.l ? modes.d : modes.l));

    useEffect(() => {
        document.documentElement.setAttribute('data-theme', (theme === modes.d ? modes.d : modes.l));
        localStorage.setItem('theme', theme);
    }, [theme]);

    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-background">
            <div className="border-t border-1 border-color">
                <p className="container text-center py-3 text-sm text-muted">
                    <strong className="font-bold">{Title}</strong> &copy; {currentYear}. Todos los derechos reservados.
                </p>
            </div>
            <div className="fixed bottom-1 right-1" style={{ zIndex: '99' }}>
                <Button onClick={toggleTheme}>
                    {theme === 'light' ? <Moon aria-hidden="true" /> : <Sun aria-hidden="true" />}
                </Button>
            </div>
        </footer>
    );
};

export default Footer;
