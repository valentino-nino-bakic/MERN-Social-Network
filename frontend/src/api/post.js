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


export { getAllPosts };
