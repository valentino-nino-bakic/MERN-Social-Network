

import { Navigate } from 'react-router-dom';

import useAuth from '../hooks/useAuth';


const Profile = () => {
    const { user } = useAuth();

    if (!user) {
        return <Navigate to='/' />
    }
    

    return (
        <div>
            <p>user homepage</p>
            <p>user homepage</p>
            <p>user homepage</p>
            <p>user homepage</p>
            <p>user homepage</p>
            <p>user homepage</p>
            <p>user homepage</p>
            <p>user homepage</p>
            <p>user homepage</p>
            <p>user homepage</p>
            <p>user homepage</p>
            <p>user homepage</p>
        </div>
    )
}

export default Profile;
