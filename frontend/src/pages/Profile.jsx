
import { useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';

import useAuth from '../hooks/useAuth';
import CreatePost from '../components/CreatePost';




const Profile = () => {
    const { user, updateProfileImage, picture, setPicture, acceptFriendshipRequest, declineFriendshipRequest, getFriendRequests } = useAuth();

    const [file, setFile] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const [friendRequests, setFriendRequests] = useState([]);


    useEffect(() => {
        const savedPicture = localStorage.getItem('profile-image');
        if (savedPicture) {
            setPicture(savedPicture);
        } else {
            setPicture(jwtDecode(user).profileImageUrl);
        }
    }, [setPicture, user]);


    useEffect(() => {
        const fetchRequests = async (userId) => {
            try {
                const requests = await getFriendRequests(userId);
                setFriendRequests(requests);
            } catch (err) {
                alert(err);
            }
        };
        if (user) {
            fetchRequests(jwtDecode(user).id);
        }
    }, [user, getFriendRequests]);



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



    const handleAcceptRequest = async (currentUserId, senderId) => {
        try {
            await acceptFriendshipRequest(currentUserId, senderId);
        } catch (err) {
            console.log(err)
        }
    };

    const handleDeclineRequest = async (currentUserId, senderId) => {
        try {
            await declineFriendshipRequest(currentUserId, senderId);
        } catch (err) {
            console.log(err);
        }
    };



    return (
        <div className="container-fluid p-0">

            <div className="position-relative d-flex align-items-center bg-image-holder">
                <div className="position-absolute d-flex align-items-center px-5" style={{ bottom: '-80px' }}>
                    <div className="position-relative" style={{ width: '200px', height: '200px' }}>
                        <img
                            src={picture}
                            alt="User"
                            className="rounded-circle border border-3"
                            style={{ width: '200px', height: '200px', objectFit: 'cover' }}
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

            <div className="p-5">
                <CreatePost />

                <div className="friend-requests mt-5">
                    <h2>Friend Requests</h2>
                    {friendRequests.length > 0 ? (
                        friendRequests.map(request => (
                            <div key={request._id} className="d-flex align-items-center my-3">
                                <p>{request.senderId.username}</p>
                                <img
                                    src={request.senderId.profileImageUrl}
                                    alt={request.senderId.username}
                                    style={{width: '50px', height: '50px', borderRadius: '50%', objectFit: 'cover'}}
                                />
                                <button className="btn btn-success mx-2" onClick={() => handleAcceptRequest(jwtDecode(user).id, request.senderId)}>Accept</button>
                                <button className="btn btn-danger" onClick={() => handleDeclineRequest(jwtDecode(user).id, request.senderId)}>Decline</button>
                            </div>
                        ))
                    ) : (
                        <p>No friend requests</p>
                    )}
                </div>
            </div>



        </div>
    )
}




export default Profile;
