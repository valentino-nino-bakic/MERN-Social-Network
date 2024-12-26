


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



const fetchFriendshipInfo = (socket, data) => {
    return new Promise((resolve, reject) => {
        socket.emit('fetchFriendshipInfo', data);

        socket.on('fetchFriendshipInfoResponse', response => {
            if (response.success !== false) {
                resolve(response);
                console.log(response);
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
                console.log(response);
            } else {
                reject(new Error(response.message));
            }
        });
    });
}




const fetchFriends = (socket, userId) => {
    return new Promise((resolve, reject) => {
        socket.emit('fetchFriends', { userId });

        socket.on('fetchFriendsResponse', response => {
            if (response.success) {
                resolve(response.friends);
                console.log(response);
            } else {
                reject(new Error(response.message));
            }
        });
    });
}




export {
    sendFriendRequest,
    acceptFriendRequest,
    declineFriendRequest,
    fetchFriendshipInfo,
    fetchFriendRequests,
    fetchFriends
}
