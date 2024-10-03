import { createContext, useState, useCallback } from 'react';
import { getPostSpecificComments, createComment } from '../api/comment';


const CommentContext = createContext();


const CommentProvider = ({ children }) => {
    const [comments, setComments] = useState({});
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);


    const getComments = useCallback(async (postId) => {
        setLoading(true);
        setError(null);
        try {
            const data = await getPostSpecificComments(postId);
            setComments(prev => ({
                ...prev,
                [postId]: data
            }));
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    }, []);



    const addNewComment = useCallback(async (token, postId, author, content) => {
        setLoading(true);
        setError(null);
        try {
            const data = await createComment(token, postId, author, content);
            setComments(prev => ({
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
        <CommentContext.Provider value={{ comments, getComments, addNewComment, loading, error }}>
            {children}
        </CommentContext.Provider>
    )
}



export { CommentContext, CommentProvider }
