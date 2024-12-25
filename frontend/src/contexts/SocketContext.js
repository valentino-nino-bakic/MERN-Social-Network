import { createContext, useEffect, useMemo, /* useState, */ useCallback } from 'react';
import { io } from 'socket.io-client';

import {
    // isUserFriend,
    sendFriendRequest,
    acceptFriendRequest,
    declineFriendRequest,
    fetchFriendshipInfo,
    fetchFriendRequests
    // isRequestAlreadySent
} from '../api/socket';


const SOCKET_URL = process.env.REACT_APP_BASE_URL;



const SocketContext = createContext();

const SocketProvider = ({ children }) => {
    const socket = useMemo(() => io(SOCKET_URL, {
        reconnectionAttempts: 5,
        reconnectionDelay: 1000
    }), []);

    useEffect(() => {
        const handleConnect = () => console.log('User connected');
        const handleDisconnect = () => console.log('User disconnected');
        
        socket.on('connect', handleConnect);
        socket.on('disconnect', handleDisconnect);

        return () => {
            socket.off('connect', handleConnect);
            socket.off('disconnect', handleDisconnect);
        };

    }, [socket]);




    // const isOtherUserFriend = (currentUserId, otherUserId) => {
    //     return isUserFriend(socket, currentUserId, otherUserId);
    // }


    const sendFriendshipRequest = (currentUserId, otherUserId) => {
        return sendFriendRequest(socket, currentUserId, otherUserId);
    }


    const acceptFriendshipRequest = (currentUserId, senderId) => {
        return acceptFriendRequest(socket, currentUserId, senderId);
    }


    const declineFriendshipRequest = (currentUserId, senderId) => {
        return declineFriendRequest(socket, currentUserId, senderId);
    }

    // const getComments = useCallback(async (postId) => {
    //     setLoading(true);
    //     setError(null);
    //     try {
    //         const data = await getPostSpecificComments(postId);
    //         setComments(prev => ({
    //             ...prev,
    //             [postId]: data
    //         }));
    //     } catch (error) {
    //         setError(error.message);
    //     } finally {
    //         setLoading(false);
    //     }
    // }, []);

    const getFriendshipInfo = useCallback((socket, data) => {
        return fetchFriendshipInfo(socket, data);
    }, []);


    const getFriendRequests = useCallback((socket, userId) => {
        return fetchFriendRequests(socket, userId);
    }, []);


    // const hasRequestAlreadyBeenSent = (currentUserId, otherUserId) => {
    //     return isRequestAlreadySent(socket, currentUserId, otherUserId);
    // }



    return (
        <SocketContext.Provider value={{
            socket,
            // isOtherUserFriend,
            sendFriendshipRequest,
            acceptFriendshipRequest,
            declineFriendshipRequest,
            getFriendshipInfo,
            getFriendRequests
            // hasRequestAlreadyBeenSent
        }}>
            {children}
        </SocketContext.Provider>
    );
};



export { SocketContext, SocketProvider }
