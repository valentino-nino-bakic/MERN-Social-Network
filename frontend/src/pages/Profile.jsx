
import { useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';
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
                    <img
                        src={picture}
                        alt="User"
                        className="rounded-circle border border-3"
                        style={{ width: '200px', height: '200px', objectFit: 'cover' }}
                    />
                    <h1 className="ms-3 text-white pb-5">{jwtDecode(user).username}</h1>
                </div>
            </div>


            <div className="container vh-100 d-flex flex-column justify-content-center align-items-center">
                <p>Profile page</p>

                <input type="file" onChange={handleChooseFile} className="form-control mb-3" />

                <button onClick={handleUpload} className="btn btn-primary" disabled={loading}>
                    {loading ? 'Uploading...' : 'Upload Profile Image'}
                </button>

                {error && <p className="text-danger">{error}</p>}

                {!file && <p className="mt-2">Choose profile image</p>}
            </div>

        </div>
    )
}




export default Profile;
