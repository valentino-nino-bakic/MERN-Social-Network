
import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

import useAuth from '../hooks/useAuth';
import useTheme from '../hooks/useTheme';
import Button from './Button';



const HomeNavbar = () => {
    const { theme, toggleTheme } = useTheme();

    useEffect(() => {
        document.body.className = theme === 'dark' ? 'dark-theme' : '';
    }, [theme]);


    const { user, logout, picture, setPicture } = useAuth();
    const navigate = useNavigate();

    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        const savedPicture = localStorage.getItem('profile-image');
        if (savedPicture) {
            setPicture(savedPicture);
        } else {
            setPicture(jwtDecode(user).profileImageUrl);
        }
    }, [setPicture, user]);



    const handleLogout = async () => {
        await logout();
        navigate('/');
    }



    const handleSearch = e => {
        e.preventDefault();
        if (searchQuery.trim() !== '') {
            navigate(`/home/search-results?query=${searchQuery}`);
        }
        setSearchQuery('');
    }


    return (
        <nav className="navbar navbar-expand-lg sticky-top">
            <div className="container">
                <div className="d-flex justify-content-between w-100">
                    <div className="d-flex align-items-center flex-grow-1">
                        <Link className="navbar-brand" to="/home">
                            <img src="https://image.similarpng.com/very-thumbnail/2020/12/Lorem-ipsum-logo-isolated-clipart-PNG.png" alt="Logo" className="me-2" style={{ height: '60px' }} />
                        </Link>
                        <form onSubmit={handleSearch} className="d-flex">
                            <input
                                className="form-control me-2"
                                type="search"
                                placeholder="Search Loremipsumia"
                                value={searchQuery}
                                onChange={e => setSearchQuery(e.target.value)}
                                aria-label="Search"
                            />
                            <button className="btn btn-outline-primary" type="submit">Search</button>
                        </form>
                    </div>

                    <div className="d-flex align-items-center">
                        <button className="btn btn-success me-3 toggle-theme-button" onClick={toggleTheme}>Toggle theme</button>
                        <ul className="navbar-nav align-items-center">
                            <Link className="navbar-brand" to="/home/profile">
                                <li className="nav-item d-flex align-items-center mx-2">
                                    <img
                                        src={picture}
                                        alt="User Avatar"
                                        className="rounded-circle me-2"
                                        style={{ width: '30px', height: '30px', objectFit: 'cover' }}
                                    />
                                    <span className="me-2">{jwtDecode(user).username}</span>
                                </li>
                            </Link>
                            <li className="nav-item">
                                <Button type="button" onClick={handleLogout} className="btn btn-primary">Logout</Button>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </nav>
    );
}



export default HomeNavbar;
