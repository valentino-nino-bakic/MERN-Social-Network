import { Outlet } from 'react-router-dom';
import HomeNavbar from './HomeNavbar';
import Footer from './Footer';


const HomeLayout = () => {
    return (
        <>
            <HomeNavbar />

            <Outlet />

            <Footer />
        </>
    )
};


export default HomeLayout;
