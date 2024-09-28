import { useEffect } from 'react';

import { Navigate } from 'react-router-dom';

import Button from '../components/Button';
import useAuth from '../hooks/useAuth';

const Profile = () => {
    const { user, logout } = useAuth();
    
    useEffect(() => {
        console.log(user);
    }, [user]);

    if (!user) {
        return <Navigate to='/' />
    }

    return (
        <div>
            <h1>Username: {user}</h1>
            <Button onClick={logout}>Logout</Button>
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
