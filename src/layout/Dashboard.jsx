// /src/layout/Dashboard.jsx
import { Outlet } from 'react-router';
// Constante
import { Title } from '@constants/configuration';
// Secciones
import Aside  from '@layout/dashboard/Aside';
import Header from '@layout/global/Header';
import { Footer } from '@layout/global/Footer';

const Dashboard = () => {
    return (
        <>
            <Header from="admin" />
            <main className="grid gap-4 grid-dashboard p-3 lg:p-4">
                <Aside />
                <div className="p-4 lg:p-6">
                    <Outlet />
                </div>
            </main>
            <Footer brand={Title} isFull={false} />
        </>
    );
}

export default Dashboard;