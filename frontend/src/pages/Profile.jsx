

import { Navigate, useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

import Button from '../components/Button';
import useAuth from '../hooks/useAuth';

const Profile = () => {
    const navigate = useNavigate();

    const { user, logout } = useAuth();

    let username;
    if (user) {
        try {
            username = jwtDecode(user).username;
        } catch (error) {
            console.error(error);
        }
    }

    const handleLogout = async () => {
        await logout();
        navigate('/');
    }

    if (!user) {
        return <Navigate to='/' />
    }

    return (
        <div>
            <h1>Username: {username}</h1>
            <Button type="button" onClick={handleLogout} className="btn btn-primary btn-block">Logout</Button>
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
