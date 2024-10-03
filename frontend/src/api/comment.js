import API_ENDPOINTS from './constants';


const getPostSpecificComments = async () => {
    try {
        const response = await fetch(`${API_ENDPOINTS.COMMENTS}/postId`);
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


export { getPostSpecificComments };
