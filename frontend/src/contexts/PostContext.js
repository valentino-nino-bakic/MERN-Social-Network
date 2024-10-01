import { createContext, useState, useCallback } from 'react';
import { getAllPosts } from '../api/post';


const PostContext = createContext();


const PostProvider = ({ children }) => {
    const [posts, setPosts] = useState(() => {
        const allPosts = localStorage.getItem('allPosts');
        return allPosts ? JSON.parse(allPosts) : [];
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);


    const getPosts = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const data = await getAllPosts();
            setPosts(data.posts);
            localStorage.setItem('allPosts', JSON.stringify(data.posts));
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    }, []);


    return (
        <PostContext.Provider value={{ posts, getPosts, loading, error }}>
            {children}
        </PostContext.Provider>
    )
}



export { PostContext, PostProvider }
