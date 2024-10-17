

const isUserFriend = (socket, currentUserId, otherUserId) => {
    return new Promise((resolve, reject) => {
        socket.emit('isUserFriend', { currentUserId, otherUserId });

        socket.on('isUserFriendResponse', response => {
            if (response.success) {
                resolve(response.isFriend);
            } else {
                reject(new Error(response.message));
            }
        });
    });
}



const sendFriendRequest = (socket, currentUserId, otherUserId) => {
    return new Promise((resolve, reject) => {
        socket.emit('sendFriendRequest', { currentUserId, otherUserId });

        socket.on('sendFriendRequestResponse', response => {
            if (response.success) {
                resolve(response);
            } else {
                reject(new Error(response.message));
            }
        });
    });
}



const acceptFriendRequest = (socket, currentUserId, senderId) => {
    return new Promise((resolve, reject) => {
        socket.emit('acceptFriendRequest', { currentUserId, senderId });

        socket.on('acceptFriendRequestResponse', response => {
            if (response.success) {
                resolve(response.message);
            } else {
                reject(new Error(response.message));
            }
        });
    });
}



const declineFriendRequest = (socket, currentUserId, senderId) => {
    return new Promise((resolve, reject) => {
        socket.emit('declineFriendRequest', { currentUserId, senderId });

        socket.on('declineFriendRequestResponse', response => {
            if (response.success) {
                resolve(response.message);
            } else {
                reject(new Error(response.message));
            }
        });
    });
}



const fetchFriendRequests = (socket, userId) => {
    return new Promise((resolve, reject) => {
        socket.emit('fetchFriendRequests', { userId });

        socket.on('fetchFriendRequestsResponse', response => {
            if (response.success) {
                resolve(response.friendRequests);
            } else {
                reject(new Error(response.message));
            }
        });
    });
}



const isRequestAlreadySent = (socket, currentUserId, otherUserId) => {
    return new Promise((resolve, reject) => {
        socket.emit('isRequestAlreadySent', { currentUserId, otherUserId });

        socket.on('isRequestAlreadySentResponse', response => {
            if (response.success) {
                resolve(response.isRequestSent);
            } else {
                reject(new Error(response.message));
            }
        });
    });
}





export {
    isUserFriend,
    sendFriendRequest,
    acceptFriendRequest,
    declineFriendRequest,
    fetchFriendRequests,
    isRequestAlreadySent
};
