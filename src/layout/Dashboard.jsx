// /src/layout/Dashboard.jsx
import { Suspense, lazy } from 'react';
// Librería
import { Outlet } from 'react-router';
// Constante
import { Title } from '@constants/configuration';
// Secciones
const Aside = lazy(() => import('@layout/dashboard/Aside'));
import Header from '@layout/global/Header';
import { Footer } from '@layout/global/Footer';

const Dashboard = () => {
    return (
        <>
            <Header from="admin" />
            <main className="grid gap-4 grid-dashboard p-3 lg:p-4">
                <Suspense fallback={<div className="min-h-[200px] flex items-center justify-center text-muted">Cargando panel...</div>}>
                    <Aside />
                </Suspense>
                <div className="p-4 lg:p-6">
                    <Outlet />
                </div>
            </main>
            <Footer brand={Title} isFull={false} />
        </>
    );
}

export default Dashboard;