// /src/layout/Dashboard.jsx
import { Outlet } from 'react-router';
// Constante
import { Title } from '@constants/configuration';
// Secciones
import Header from '@layout/global/Header';
import { Footer } from '@layout/global/Footer';

const AuthLayout = () => {
    return (
        <>
            <Header from="auth" />
            <main className="p-3 lg:p-4">
                <div className="w-1/3 mx-auto p-4 lg:p-6">
                    <Outlet />
                </div>
            </main>
            <Footer brand={Title} isFull={false} />
        </>
    );
}

export default AuthLayout;