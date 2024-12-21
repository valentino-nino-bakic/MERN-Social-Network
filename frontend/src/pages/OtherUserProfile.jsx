
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

import useAuth from '../hooks/useAuth';
import useSocket from '../hooks/useSocket';



const OtherUserProfile = () => {
    const { getUserByUsername, user } = useAuth();
    const { isOtherUserFriend, sendFriendshipRequest, hasRequestAlreadyBeenSent } = useSocket();
    
    const { username } = useParams();

    const [profileData, setProfileData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const [isFriend, setIsFriend] = useState(false);
    const [friendRequestLoading, setFriendRequestLoading] = useState(false);

    const [isRequestSent, setIsRequestSent] = useState(false);



    useEffect(() => {
        const fetchUser = async () => {
            setLoading(true);
            setError(null);
            try {
                const data = await getUserByUsername(username);
                setProfileData(data);
                if (user) {
                    const friendshipStatus = await isOtherUserFriend(jwtDecode(user).id, data._id);
                    setIsFriend(friendshipStatus);
                    const sentRequest = await hasRequestAlreadyBeenSent(jwtDecode(user).id, data._id);
                    setIsRequestSent(sentRequest);
                }
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };
        if (username) {
            fetchUser();
        } else {
            setProfileData(null);
            setLoading(false);
        }
    }, [username, getUserByUsername, isOtherUserFriend, user, hasRequestAlreadyBeenSent]);






    const handleSendFriendRequest = async (currentUserId, otherUserId) => {
        if (profileData) {
            setFriendRequestLoading(true);
            try {
                await sendFriendshipRequest(currentUserId, otherUserId);
                alert('Friend request sent!');
                setIsRequestSent(true);
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
        <div className="container-fluid p-0">

            <div className="position-relative d-flex align-items-center bg-image-holder">
                <div className="position-absolute d-flex align-items-center px-5" style={{ bottom: '-80px' }}>
                    <div className="position-relative" style={{ width: '200px', height: '200px' }}>
                        <img
                            src={profileData.profileImageUrl}
                            alt="User"
                            className="rounded-circle border border-3"
                            style={{ width: '200px', height: '200px', objectFit: 'cover' }}
                        />
                    </div>
                    <h1 className="ms-3 text-white pb-5">{profileData.username}</h1>
                </div>
            </div>

            <div className="vh-100 d-flex align-items-center justify-content-center">
                <h1>Profile Page of {profileData.username}</h1>

                {isFriend ? (
                    <p>You are friends</p>
                ) : (
                    <>
                        {isRequestSent ? (
                            <button className="btn btn-secondary" disabled>
                                Friend request sent
                            </button>
                        ) : (
                            <button
                                className="btn btn-primary"
                                onClick={() => handleSendFriendRequest(jwtDecode(user).id, profileData._id)}
                                disabled={friendRequestLoading}
                            >
                                {friendRequestLoading ? 'Sending request...' : 'Add friend'}
                            </button>
                        )}
                    </>
                )}


            </div>



        </div>
    )
}




export default OtherUserProfile;
