
import { useState, useEffect } from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import ModalImage from 'react-modal-image';

import useAuth from '../hooks/useAuth';



const Profile = () => {
    const { user, updateProfileImage, picture, setPicture } = useAuth();

    const [file, setFile] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);



    useEffect(() => {
        const savedPicture = localStorage.getItem('profile-image');
        if (savedPicture) {
            setPicture(savedPicture);
        } else {
            setPicture(jwtDecode(user).profileImageUrl);
        }
    }, [setPicture, user]);



    const handleChooseFile = e => {
        const selectedFile = e.target.files[0];
        if (selectedFile) {
            setFile(selectedFile);
            setError(null);
        };
    }


    const handleUpload = async e => {
        e.preventDefault();
        const jwt = localStorage.getItem('token');
        if (file) {
            try {
                setLoading(true);
                await updateProfileImage(jwt, file);
                setFile(null);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        } else {
            setError(`You didn't choose any file yet`);
        }
    };




    return (
        <div className="container-fluid p-0">

            <div className="position-relative d-flex align-items-center bg-image-holder">
                <div className="position-absolute d-flex align-items-center px-5" style={{ bottom: '-80px' }}>
                    <div className="position-relative" style={{ width: '200px', height: '200px' }}>
                        <ModalImage
                            small={picture}
                            large={picture}
                            alt={jwtDecode(user).username}
                            className="rounded-circle border border-3 profile-image"
                        />
                        <i className="fa-solid fa-upload"
                            data-bs-toggle="modal" data-bs-target="#upload-modal"
                            style={{
                                position: 'absolute',
                                bottom: '10px',
                                right: '10px',
                                color: 'white',
                                fontSize: '15px',
                                backgroundColor: 'rgba(0, 0, 0, 0.5)',
                                borderRadius: '50%',
                                padding: '10px',
                                cursor: 'pointer'
                            }}
                        />
                    </div>
                    <h1 className="ms-3 text-white pb-5">{jwtDecode(user).username}</h1>
                </div>
            </div>


            <div className="modal" id="upload-modal">
                <div className="modal-dialog">
                    <div className="modal-content">

                        <div className="modal-header">
                            <h4 className="modal-title">Upload Image</h4>
                            <button type="button" className="btn-close" data-bs-dismiss="modal"></button>
                        </div>

                        <div className="modal-body">
                            <div className="container d-flex flex-column justify-content-center align-items-center">

                                <input type="file" onChange={handleChooseFile} className="form-control mb-3" />

                                <button onClick={handleUpload} className="btn btn-primary" disabled={loading}>
                                    {loading ? 'Uploading...' : 'Upload Profile Image'}
                                </button>

                                {error && <p className="text-danger">{error}</p>}

                                {!file && <p className="mt-2">Choose profile image</p>}
                            </div>
                        </div>

                    </div>
                </div>
            </div>

            <ul className="list-unstyled d-flex justify-content-center w-100 p-0 profile-page-ul">
                <NavLink to='/home/profile' end className={({ isActive }) => `text-decoration-none px-4 py-2 ${isActive ? 'active-link' : ''}`}>Posts</NavLink>
                <NavLink to='/home/profile/friends' className={({ isActive }) => `text-decoration-none px-4 py-2 ${isActive ? 'active-link' : ''}`}>Friends</NavLink>
            </ul>

            <div className="p-5">
                <Outlet />
            </div>
        </div>
    )
}




export default Profile;
