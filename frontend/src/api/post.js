import API_ENDPOINTS from './constants';


const getAllPosts = async () => {
    try {
        const response = await fetch(API_ENDPOINTS.POSTS);
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


const getPostsByUserId = async (userId) => {
    try {
        const response = await fetch(`${API_ENDPOINTS.POSTS}/${userId}`);
        if (!response.ok) {
            const data = await response.json();
            throw new Error(data.message);
        }
        const data = await response.json();
        return data.posts;
    } catch (error) {
        throw error;
    }
}



const createPost = async (token, postData) => {
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            authorization: `Bearer ${token}`
        },
        body: JSON.stringify(postData)
    }
    try {
        const response = await fetch(API_ENDPOINTS.POSTS, options);
        if (!response.ok) {
            const data = await response.json();
            throw new Error(data.message);
        }
        const data = await response.json();
        return data.post;
    } catch (error) {
        throw error;
    }
}


export { getAllPosts, getPostsByUserId, createPost };
