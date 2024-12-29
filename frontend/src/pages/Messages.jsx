
import { useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';

import useSocket from '../hooks/useSocket';
import useAuth from '../hooks/useAuth';

import Chat from '../components/Chat';


const Messages = () => {
    const [friends, setFriends] = useState([]);
    const [selectedFriend, setSelectedFriend] = useState(null);
    const { user } = useAuth();
    const { socket, getFriends, getMessages, sendMessage } = useSocket();


    useEffect(() => {
        const fetchAllFriends = async (sockety, userId) => {
            if (sockety) {
                try {
                    const allFriends = await getFriends(sockety, userId);
                    setFriends(allFriends);
                } catch (error) {
                    console.log('Error fetching friends:', error);
                }
            } else {
                console.log('Socket not initialized')
            }
        };
        fetchAllFriends(socket, jwtDecode(user).id);
    }, [getFriends, user, socket]);


    const handleSelectFriend = (friend) => {
        setSelectedFriend(friend);
    }




    return (
        <>
            <div className="container vh-100 mt-5">
                <div className="row">
                    <div className="col-md-4">
                        <div className="card shadow-sm mb-4">
                            <div className="card-body">
                                <p className="card-title mb-4">Friends</p>
                                {friends.length === 0 ? (
                                    <div className="alert alert-info" role="alert">
                                        You don't have any friends yet
                                    </div>
                                ) : (
                                    <ul className="list-group">
                                        {friends.map((friend) => (
                                            <li
                                                key={friend._id}
                                                className={`list-group-item d-flex justify-content-between align-items-center ${selectedFriend?._id === friend._id ? 'bg-warning' : '' }`}
                                            >
                                                <div>
                                                    <img
                                                        className="rounded-circle"
                                                        src={friend.profileImageUrl}
                                                        alt={friend.username}
                                                        style={{ width: '50px', height: '50px', objectFit: 'cover' }}
                                                    />
                                                    <button
                                                        data-user-username={friend.username}
                                                        // onClick={handleGoToFriendProfile}
                                                        className="btn btn-link"
                                                    >
                                                        {friend.username}
                                                    </button>
                                                </div>
                                                <button className="btn btn-outline-primary btn-sm" onClick={() => handleSelectFriend(friend)}>Message</button>
                                            </li>
                                        ))}
                                    </ul>
                                )}
                            </div>
                        </div>
                    </div>
                    <div className="col-md-8">
                        <Chat
                            user={user}
                            selectedFriend={selectedFriend}
                            socket={socket}
                            getMessages={getMessages}
                            sendMessage={sendMessage}
                        />
                    </div>
                </div>
            </div>
        </>
    )
}



export default Messages;
