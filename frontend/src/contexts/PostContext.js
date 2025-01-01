import { createContext, useState, useCallback } from 'react';
import { getAllPosts, getPostsByUserId, createPost } from '../api/post';


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
            setPosts(data.posts.reverse());
            localStorage.setItem('allPosts', JSON.stringify(data.posts));
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    }, []);



    const retrievePostsByUserId = useCallback(async userId => {
        try {
            const data = await getPostsByUserId(userId);
            return data.posts;
        } catch (error) {
            console.log(error.message);
        }
    }, []);



    const createNewPost = useCallback(async (token, postData) => {
        setLoading(true);
        setError(null);
        try {
            const data = await createPost(token, postData);
            setPosts((prev) => [...prev, data]);
            localStorage.setItem('allPosts', JSON.stringify([data, ...posts]));
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    }, [posts]);



    return (
        <PostContext.Provider value={{ posts, getPosts, retrievePostsByUserId, createNewPost, loading, error }}>
            {children}
        </PostContext.Provider>
    )
}



export { PostContext, PostProvider }
