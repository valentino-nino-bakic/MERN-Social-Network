
import { Navigate } from 'react-router-dom';

import useAuth from '../hooks/useAuth';
import AllPosts from '../components/AllPosts';



const Profile = () => {
    const { user } = useAuth();


    if (!user) {
        return <Navigate to='/' />
    }
    

    return <AllPosts />;
}



export default Profile;
