

import { useEffect, useState } from 'react';
import { jwtDecode } from 'jwt-decode';

import useAuth from '../hooks/useAuth';
import useSocket from '../hooks/useSocket';



const FriendRequests = () => {
    const { user } = useAuth();
    const { socket, acceptFriendshipRequest, declineFriendshipRequest, getFriendRequests } = useSocket();
    const [friendRequests, setFriendRequests] = useState([]);


    useEffect(() => {
        const fetchRequests = async (sockety, userId) => {
            if (sockety) {
                try {
                    const requests = await getFriendRequests(sockety, userId);
                    setFriendRequests(requests);
                } catch (err) {
                    console.log('Error fetching friend requests:', err);
                }
            } else {
                console.log('Socket not initialized')
            }
        };

        fetchRequests(socket, jwtDecode(user).id);
    }, [getFriendRequests, user, socket]);




    const handleAcceptRequest = async (currentUserId, senderId) => {
        if (socket) {
            try {
                await acceptFriendshipRequest(currentUserId, senderId);
                setFriendRequests(prev => prev.filter(req => req.senderId !== senderId));
            } catch (err) {
                console.log('Error accepting friend request:', err);
            }
        } else {
            console.log('Socket not initializzed');
        }
    };



    const handleDeclineRequest = async (currentUserId, senderId) => {
        if (socket) {
            try {
                await declineFriendshipRequest(currentUserId, senderId);
                setFriendRequests(prev => prev.filter(req => req.senderId !== senderId));
            } catch (err) {
                console.error('Error declining friend request:', err);
            }
        } else {
            console.log('Socket not initialized')
        }
    };



    
    return (
        <div className="friend-requests mt-5">
            <h2>Friend Requests</h2>
            {friendRequests.length > 0 ? (
                friendRequests.map(request => (
                    <div key={request._id} className="d-flex align-items-center my-3">
                        <p>{request.senderId.username}</p>
                        <img
                            src={request.senderId.profileImageUrl}
                            alt={request.senderId.username}
                            style={{ width: '50px', height: '50px', borderRadius: '50%', objectFit: 'cover' }}
                        />
                        <button className="btn btn-success mx-2" onClick={() => handleAcceptRequest(jwtDecode(user).id, request.senderId)}>Accept</button>
                        <button className="btn btn-danger" onClick={() => handleDeclineRequest(jwtDecode(user).id, request.senderId)}>Decline</button>
                    </div>
                ))
            ) : (
                <p>No friend requests</p>
            )}
        </div>
    );
};



export default FriendRequests;
