
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

import useAuth from '../hooks/useAuth';
import useSocket from '../hooks/useSocket';

import FriendRequests from '../components/FriendRequests';



const Friends = () => {
    const navigate = useNavigate();

    const [friends, setFriends] = useState([]);
    const { user } = useAuth();
    const { socket, getFriends } = useSocket();

    const [friendsLoading, setFriendsLoading] = useState(true);


    useEffect(() => {
        const fetchAllFriends = async (sockety, userId) => {
            if (sockety) {
                try {
                    const allFriends = await getFriends(sockety, userId);
                    setFriends(allFriends);
                } catch (error) {
                    console.log('Error fetching friends:', error);
                } finally {
                    setFriendsLoading(false);
                }
            } else {
                console.log('Socket not initialized');
                setFriendsLoading(false);
            }
        };
        fetchAllFriends(socket, jwtDecode(user).id);
    }, [getFriends, user, socket]);


    const handleGoToFriendProfile = e => {
        const username = e.target.getAttribute('data-user-username');
        navigate(`/home/user/${username}`);
    }


    const handleGoToFriendChat = e => {
        const username = e.target.getAttribute('data-user-username');
        navigate(`/home/messages/${username}`);
    }


    console.log('friends', friends);
    return (
        <div className="container py-5">
            <div className="row">
                <div className="col-md-6">
                    <div className="card shadow-sm mb-4">
                        <div className="card-body">
                            <FriendRequests />
                        </div>
                    </div>
                </div>

                <div className="col-md-6">
                    <div className="card shadow-sm mb-4">
                        <div className="card-body">
                            <h3 className="card-title mb-4">Friends</h3>
                            {friendsLoading ? (
                                <div className="text-center">
                                    <div className="spinner-border" role="status">
                                        <span className="sr-only">Loading...</span>
                                    </div>
                                </div>
                            ) : friends.length === 0 ? (
                                <div className="alert alert-info" role="alert">
                                    You don't have any friends yet
                                </div>
                            ) : (
                                <ul className="list-group">
                                    {friends.map((friend) => (
                                        <li key={friend._id} className="list-group-item d-flex justify-content-between align-items-center">
                                            <div>
                                                <img
                                                    className="rounded-circle"
                                                    src={friend.profileImageUrl}
                                                    alt={friend.username}
                                                    style={{ width: '50px', height: '50px', objectFit: 'cover' }}
                                                />
                                                <button
                                                    data-user-username={friend.username}
                                                    onClick={handleGoToFriendProfile}
                                                    className="btn btn-link"
                                                >
                                                    {friend.username}
                                                </button>
                                            </div>
                                            <button
                                                data-user-username={friend.username}
                                                onClick={handleGoToFriendChat}
                                                className="btn btn-outline-primary btn-sm"
                                            >
                                                Message
                                            </button>
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}




export default Friends;
