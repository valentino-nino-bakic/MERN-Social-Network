import { createContext, useState } from 'react';
import { getAllPosts } from '../api/post';


const PostContext = createContext();


const PostProvider = ({ children }) => {
    const [posts, setPosts] = useState(() => {
        const posts = localStorage.getItem('allPosts');
        return posts ? JSON.parse(posts) : [];
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);


    const getPosts = async () => {
        setLoading(true);
        setError(null);
        try {
            const data = await getAllPosts();
            setPosts(data.posts);
            localStorage.setItem('posts', JSON.stringify(data.posts));
            setLoading(false);
        } catch (error) {
            setError(error.message);
            setLoading(false);
        }
    }


    return (
        <PostContext.Provider value={{ posts, getPosts, loading, error }}>
            {children}
        </PostContext.Provider>
    )
}



export { PostContext, PostProvider }
