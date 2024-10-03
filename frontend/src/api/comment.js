import API_ENDPOINTS from './constants';


const getPostSpecificComments = async (postId) => {
    try {
        const response = await fetch(`${API_ENDPOINTS.COMMENTS}/${postId}`);
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



const createComment = async (token, postId, author, content) => {
    const requestBody = {
        postId: postId,
        author: author,
        content: content
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
        const response = await fetch(API_ENDPOINTS.COMMENTS, options);
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


export { getPostSpecificComments, createComment };
