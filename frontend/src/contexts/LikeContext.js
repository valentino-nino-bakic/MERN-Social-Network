import { createContext, useState, useCallback } from 'react';
import { getPostSpecificLikes, likePost } from '../api/like';


const LikeContext = createContext();


const LikeProvider = ({ children }) => {
    const [likes, setLikes] = useState({});
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);


    const getLikes = useCallback(async (postId) => {
        setLoading(true);
        setError(null);
        try {
            const data = await getPostSpecificLikes(postId);
            setLikes(prev => ({
                ...prev,
                [postId]: data
            }));
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    }, []);



    const addNewLike = useCallback(async (token, postId, author) => {
        setLoading(true);
        setError(null);
        try {
            const data = await likePost(token, postId, author);
            setLikes(prev => ({
                ...prev,
                [postId]: [...(prev[postId] || []), data]
            }));
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    }, []);



    return (
        <LikeContext.Provider value={{ likes, getLikes, addNewLike, loading, error }}>
            {children}
        </LikeContext.Provider>
    )
}



export { LikeContext, LikeProvider }
