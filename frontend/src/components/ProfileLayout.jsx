import { Outlet } from 'react-router-dom';
import ProfileNavbar from './ProfileNavbar';
import Footer from './Footer';


const ProfileLayout = () => {
    return (
        <>
            <ProfileNavbar />

            <Outlet />

            <Footer />
        </>
    )
};


export default ProfileLayout;
