import { useEffect } from 'react';

import usePost from '../hooks/usePost';



const AllPosts = () => {
    const { posts, getPosts, loading, error } = usePost();

    useEffect(() => {
        const fetchAllPosts = async () => {
            await getPosts();
        }
        fetchAllPosts();
    }, [getPosts]);



     if (loading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>Error: {error}</p>;
    }

    return (
        <>
            {posts.length > 0 ? (
                posts.map(post => (
                    <div className="my-5" key={post._id}>
                        <p>Title: {post.title}</p>
                        <p>Content: {post.content}</p>
                    </div>
                ))
            ) : (
                <div className="container vh-100">nema postova u bazi</div>
            )}
        </>
    )


}



export default AllPosts;
