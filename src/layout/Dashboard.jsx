// /src/layout/Dashboard.jsx
import { Outlet } from 'react-router';

// Secciones
import Header from '@layout/dashboard/Header';
import Aside  from '@layout/dashboard/Aside';
import Footer from '@layout/dashboard/Footer';

const Dashboard = () => {
    return (
        <>
            <Header />
            <main className="grid gap-2 grid-dashboard">
                <Aside />
                <div className="shrink-1 p-1 container">
                    <Outlet />
                </div>
            </main>
            <Footer />
        </>
    );
}

export default Dashboard;