
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import ModalImage from 'react-modal-image';

import useAuth from '../hooks/useAuth';
import useSocket from '../hooks/useSocket';

import SingleUserPosts from '../components/SingleUserPosts';




const OtherUserProfile = () => {
    const { getUserByUsername, user } = useAuth();
    const { socket, getFriendshipInfo, sendFriendshipRequest } = useSocket();

    const { username } = useParams();

    const [profileData, setProfileData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const [friendRequestLoading, setFriendRequestLoading] = useState(false);

    const [isFriend, setIsFriend] = useState(() => {
        const isOtherUserYourFriend = localStorage.getItem('isOtherUserYourFriend');
        return isOtherUserYourFriend;
    });
    const [isRequestSent, setIsRequestSent] = useState(() => {
        const friendshipRequestSent = localStorage.getItem('friendshipRequestSent');
        return friendshipRequestSent;
    });
    const [thisUserInYourFriendRequestList, setThisUserInYourFriendRequestList] = useState(() => {
        const inYourFriendRequestList = localStorage.getItem('inYourFriendRequestList');
        return inYourFriendRequestList;
    });


    useEffect(() => {
        const fetchUser = async () => {
            setLoading(true);
            setError(null);
            try {
                const data = await getUserByUsername(username);
                setProfileData(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        }
        if (username) {
            fetchUser();
        } else {
            setProfileData(null);
            setLoading(false);
        }
    }, [username, getUserByUsername]);



    useEffect(() => {
        const fetchFriendshipStatus = async () => {
            if (user && profileData) {
                const bothUserIDS = {
                    currentUserId: jwtDecode(user).id,
                    otherUserId: profileData._id
                }
                try {
                    const status = await getFriendshipInfo(socket, bothUserIDS);
                    setIsFriend(status.isFriend);
                    localStorage.setItem('isOtherUserYourFriend', status.isFriend);
                    setIsRequestSent(status.isRequestSent);
                    localStorage.setItem('friendshipRequestSent', status.isRequestSent);
                    setThisUserInYourFriendRequestList(status.isRequestReceived);
                    localStorage.setItem('inYourFriendRequestList', status.isRequestReceived);
                } catch (err) {
                    console.error(err.message);
                }
            }
        };

        fetchFriendshipStatus();
    }, [user, profileData, socket, getFriendshipInfo]);





    const handleSendFriendRequest = async (currentUserId, otherUserId) => {
        if (profileData) {
            setFriendRequestLoading(true);
            try {
                await sendFriendshipRequest(currentUserId, otherUserId);
                alert('Friend request sent!');
                setIsRequestSent(true);
                localStorage.setItem('friendshipRequestSent', true);
            } catch (err) {
                alert(err.message);
            } finally {
                setFriendRequestLoading(false);
            }
        }
    };



    if (loading) {
        return <div>Loading...</div>
    }

    if (error) {
        return <div>Error: {error}</div>
    }



    return (
        <>
            <div className="container-fluid p-0">

                <div className="position-relative d-flex align-items-center bg-image-holder">
                    <div className="position-absolute d-flex align-items-center px-5" style={{ bottom: '-80px' }}>
                        <div className="position-relative" style={{ width: '200px', height: '200px' }}>
                            <ModalImage
                                small={profileData.profileImageUrl}
                                large={profileData.profileImageUrl}
                                alt={profileData.username}
                                className="rounded-circle border border-3 profile-image"
                            />
                        </div>
                        <h1 className="ms-3 text-white pb-5">{profileData.username}</h1>
                    </div>
                </div>

                <div className="container position-relative">
                    <div className="row">
                        <div className="col-3"></div>
                        <div className="col-2">
                            {isFriend ? (
                                <p className="position-absolute text-light" style={{ bottom: '20px' }}><i className="fas fa-user-friends"></i> Friends</p>
                            ) : isRequestSent ? (
                                <p className="position-absolute text-light" style={{ bottom: '20px' }}><i className="fas fa-user-check"></i> Friend request sent</p>
                            ) : thisUserInYourFriendRequestList ? (
                                <p className="position-absolute text-light" style={{ bottom: '20px' }}><i className="fas fa-user-check"></i> You have a pending friend request from this user</p>
                            ) : (
                                <button
                                    className="btn btn-primary position-absolute"
                                    style={{ bottom: '20px' }}
                                    onClick={() => handleSendFriendRequest(jwtDecode(user).id, profileData._id)}
                                    disabled={friendRequestLoading}
                                >
                                    <i className="fas fa-user-plus"></i>
                                    {friendRequestLoading ? ' Sending request...' : ' Add friend'}
                                </button>
                            )}
                        </div>
                        <div className="col-7"></div>
                    </div>
                </div>

            </div>
            <div className="container-fluid mt-5">
                <div className="row">
                    <div className="col-4"></div>
                    <div className="col-4">
                        <div style={{ minWidth: '634px' }}>
                            <SingleUserPosts singleUserId={profileData._id} />
                        </div>
                    </div>
                    <div className="col-4"></div>
                </div>
            </div>
        </>
    )
}




export default OtherUserProfile;
