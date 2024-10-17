import { createContext, useEffect, useState } from 'react';
import { io } from 'socket.io-client';

import {
    isUserFriend,
    sendFriendRequest,
    acceptFriendRequest,
    declineFriendRequest,
    fetchFriendRequests,
    isRequestAlreadySent
} from '../api/socket';

const BASE_URL = process.env.REACT_APP_BASE_URL;


const SocketContext = createContext();
const socket = io(BASE_URL);



const SocketProvider = ({ children }) => {
    const [connected, setConnected] = useState(false);


    useEffect(() => {
        socket.on('connect', () => {
            setConnected(true);
            console.log('User connected');
        });

        socket.on('disconnect', () => {
            setConnected(false);
            console.log('User disconnected');
        });
        

        return () => {
            socket.off('connect');
            socket.off('disconnect');
        };
    }, []);



    
    const isOtherUserFriend = (currentUserId, otherUserId) => {
        return isUserFriend(socket, currentUserId, otherUserId);
    }


    const sendFriendshipRequest = (currentUserId, otherUserId) => {
        return sendFriendRequest(socket, currentUserId, otherUserId);
    }


    const acceptFriendshipRequest = (currentUserId, senderId) => {
        return acceptFriendRequest(socket, currentUserId, senderId);
    }


    const declineFriendshipRequest = (currentUserId, senderId) => {
        return declineFriendRequest(socket, currentUserId, senderId);
    }


    const getFriendRequests = (userId) => {
        return fetchFriendRequests(socket, userId);
    }

    
    const hasRequestAlreadyBeenSent = (currentUserId, otherUserId) => {
        return isRequestAlreadySent(socket, currentUserId, otherUserId);
    }

    

    return (
        <SocketContext.Provider value={{
            connected,
            isOtherUserFriend,
            sendFriendshipRequest,
            acceptFriendshipRequest,
            declineFriendshipRequest,
            getFriendRequests,
            hasRequestAlreadyBeenSent
        }}>
            {children}
        </SocketContext.Provider>
    );
};



export { SocketContext, SocketProvider }
