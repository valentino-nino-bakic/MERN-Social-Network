import API_ENDPOINTS from './constants';


const getPostSpecificLikes = async (postId) => {
    try {
        const response = await fetch(`${API_ENDPOINTS.LIKES}/${postId}`);
        if (!response.ok) {
            const data = await response.json();
            throw new Error(data.message);
        }
        const data = await response.json();
        return data.likes;
    } catch (error) {
        throw error;
    }
};



const likePost = async (token, postId, author) => {
    const requestBody = {
        postId: postId,
        author: author,
    }

    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            authorization: `Bearer ${token}`
        },
        body: JSON.stringify(requestBody)
    }

    try {
        const response = await fetch(API_ENDPOINTS.LIKES, options);
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


export { getPostSpecificLikes, likePost };
