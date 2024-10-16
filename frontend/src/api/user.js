import API_ENDPOINTS from './constants';



const loginUser = async (usernameOrEmail, password) => {
    const requestBody = {
        usernameOrEmail,
        password
    }

    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody)
    }

    try {
        const response = await fetch(API_ENDPOINTS.LOGIN, options);
        if (!response.ok) {
            const data = await response.json();
            throw new Error(data.message);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        throw error;
    }
}



const signupUser = async (username, email, password) => {
    const requestBody = {
        username,
        email,
        password
    }

    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody)
    }

    try {
        const response = await fetch(API_ENDPOINTS.SIGNUP, options);
        if (!response.ok) {
            const data = await response.json();
            throw new Error(data.message);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        throw error;
    }
}



const uploadProfileImage = async (token, formData) => {
    const options = {
        method: 'POST',
        headers: {
            Authorization: `Bearer ${token}`
        },
        body: formData
    }
    try {
        const response = await fetch(API_ENDPOINTS.UPLOAD_PROFILE_IMAGE, options);
        if (!response.ok) {
            const data = await response.json();
            throw new Error(data.message);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        throw error;
    }
}



const fetchUsersByUsername = async (query) => {
    try {
        const response = await fetch(`${API_ENDPOINTS.SEARCH_RESULTS}?query=${encodeURIComponent(query)}`);
        if (!response.ok) {
            const data = await response.json();
            throw new Error(data.message);
        }
        const data = await response.json();
        return data.users;
    } catch (error) {
        throw error;
    }
}



const fetchUserByUsername = async (query) => {
    try {
        const response = await fetch(`${API_ENDPOINTS.USER}?username=${encodeURIComponent(query)}`);
        if (!response.ok) {
            const data = await response.json();
            throw new Error(data.message);
        }
        const data = await response.json();
        return data.user;
    } catch (error) {
        throw error;
    }
}



const isUserFriend = async (currentUserId, otherUserId) => {
    try {
        const response = await fetch(`${API_ENDPOINTS.USERS}/${currentUserId}/friends/${otherUserId}`);
        if (!response.ok) {
            const data = await response.json();
            throw new Error(data.message);
        }
        const data = await response.json();
        return data.isFriend;
    } catch (error) {
        throw error;
    }
}



const sendFriendRequest = async (currentUserId, otherUserId) => {
    const requestBody = {
        senderId: currentUserId,
        receivedId: otherUserId
    }
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody)
    }
    try {
        const response = await fetch(`${API_ENDPOINTS.BASE_URL}/friend-requests`, options);
        if (!response.ok) {
            const data = await response.json();
            throw new Error(data.message);
        }
        return await response.json();
    } catch (error) {
        throw error;
    }
}



const acceptFriendRequest = async (currentUserId, senderId) => {
    const requestBody = {
        receiverId: currentUserId
    }
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(requestBody)
    }
    try {
        const response = await fetch(`${API_ENDPOINTS.BASE_URL}/friend-requests/${senderId}/accept`, options);
        if (!response.ok) {
            const data = await response.json();
            throw new Error(data.message);
        }
        const data = await response.json();
        return data.message;
    } catch (error) {
        throw error;
    }
};



const declineFriendRequest = async (currentUserId, senderId) => {
    const requestBody = {
        receiverId: currentUserId
    }
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(requestBody)
    }
    try {
        const response = await fetch(`${API_ENDPOINTS.BASE_URL}/friend-requests/${senderId}/decline`, options);
        if (!response.ok) {
            const data = await response.json();
            throw new Error(data.message);
        }
        const data = await response.json();
        return data.message;
    } catch (error) {
        throw error;
    }
};




const fetchFriendRequests = async (userId) => {
    try {
        const response = await fetch(`${API_ENDPOINTS.BASE_URL}/friend-requests/${userId}`);
        if (!response.ok) {
            const data = await response.json();
            throw new Error(data.message);
        }
        const data = await response.json();
        return data.friendRequests;
    } catch (error) {
        throw error;
    }
};



export {
    loginUser,
    signupUser,
    uploadProfileImage,
    fetchUsersByUsername,
    fetchUserByUsername,
    isUserFriend,
    sendFriendRequest,
    acceptFriendRequest,
    declineFriendRequest,
    fetchFriendRequests
};
