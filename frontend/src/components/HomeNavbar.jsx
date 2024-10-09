
import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

import useAuth from '../hooks/useAuth';
import Button from './Button';



const HomeNavbar = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const [userInfo, setUserInfo] = useState({});

    useEffect(() => {
        if (user) {
            try {
                const decoded = jwtDecode(user);
                setUserInfo(decoded);
            } catch (error) {
                console.error(error);
            }
        }
    }, [user]);

    const handleLogout = async () => {
        await logout();
        navigate('/');
    }


    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container">
                <Link className="navbar-brand" to="/home">
                    <img src="https://image.similarpng.com/very-thumbnail/2020/12/Lorem-ipsum-logo-isolated-clipart-PNG.png" alt="Logo" style={{ height: '60px' }} />
                </Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
                    <ul className="navbar-nav align-items-center gap-3">
                        <Link className="navbar-brand" to="/home/profile">
                            <li className="nav-item d-flex align-items-center mx-2 li-custom">
                                <img
                                    src={userInfo.profileImageUrl}
                                    alt="User Avatar"
                                    className="rounded-circle me-2"
                                    style={{ width: '30px', height: '30px' }}
                                />
                                <span className="navbar-text me-2">{userInfo.username}</span>
                            </li>
                        </Link>
                        <li className="nav-item">
                            <Button type="button" onClick={handleLogout} className="btn btn-primary">Logout</Button>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    )
}



export default HomeNavbar;
