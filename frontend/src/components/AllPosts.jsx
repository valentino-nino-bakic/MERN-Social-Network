import { useEffect } from 'react';

import usePost from '../hooks/usePost';


const AllPosts = () => {
    const { posts, getPosts } = usePost();


    useEffect(() => {
        const fetchAllPosts = async () => {
            await getPosts();
        }
        fetchAllPosts();
    }, [getPosts]);



    return posts.length > 0 ? (
        <ul>
            {posts.map(post => (
                <div key={post._id}>
                    <p>{post.title}</p>
                    <p>{post.content}</p>
                </div>
            ))}
        </ul>
    ) : (
        <div className="container vh-100">
            <p>nema postova u bazi</p>
        </div>
    )
}



export default AllPosts;
