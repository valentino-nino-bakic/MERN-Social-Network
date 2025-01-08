
import { Outlet } from 'react-router-dom';

import AdminNavbar from '../../components/admin/AdminNavbar';
import Footer from '../../components/Footer';


const Admin = () => {
    return (
        <>
            <AdminNavbar />

            <Outlet />

            <Footer />
        </>
    )
}



export default Admin;
