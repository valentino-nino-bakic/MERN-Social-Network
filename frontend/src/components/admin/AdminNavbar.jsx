
import { /* useState */ useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

import useAuth from '../../hooks/useAuth';
import useTheme from '../../hooks/useTheme';



const HomeNavbar = () => {
    const { theme, toggleTheme } = useTheme();

    useEffect(() => {
        document.body.className = theme === 'dark' ? 'dark-theme' : '';
    }, [theme]);


    const { user, logout, picture, setPicture } = useAuth();
    const navigate = useNavigate();

    // const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        const savedPicture = localStorage.getItem('profile-image');
        if (savedPicture) {
            setPicture(savedPicture);
        } else {
            setPicture(jwtDecode(user).profileImageUrl);
        }
    }, [setPicture, user]);


    const handleGoToYourProfile = () => {
        navigate('/admin/profile');
    }

    const handleLogout = async () => {
        await logout();
        navigate('/');
    }



    // const handleSearch = e => {
    //     e.preventDefault();
    //     if (searchQuery.trim() !== '') {
    //         navigate(`/home/search-results?query=${searchQuery}`);
    //     }
    //     setSearchQuery('');
    // }


    return (
        <nav className="navbar navbar-expand-lg sticky-top">
            <div className="container">
                <div className="d-flex justify-content-between w-100">
                    <div className="d-flex align-items-center flex-grow-1">
                        <Link className="navbar-brand" to="/admin">
                            <img src="/assets/images/logo.png" alt="Logo" className="me-2" style={{ height: '60px' }} />
                        </Link>
                    </div>

                    <div className="d-flex align-items-center">
                        <button className="btn btn-success me-3 toggle-theme-button" onClick={toggleTheme}>Toggle theme</button>
                        <div className="dropdown">
                            <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                                <img
                                    src={picture}
                                    alt="User Avatar"
                                    className="rounded-circle me-2"
                                    style={{ width: '30px', height: '30px', objectFit: 'cover' }}
                                />
                                <span className="me-2">{jwtDecode(user).username}</span>
                            </button>
                            <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="dropdownMenuButton1">
                                <li type="button" className="dropdown-item" onClick={handleGoToYourProfile}>Profile</li>
                                <li type="button" className="dropdown-item" onClick={handleLogout}>Logout</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
}



export default HomeNavbar;
