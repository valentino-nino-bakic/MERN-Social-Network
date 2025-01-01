import { useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';
import usePost from '../hooks/usePost';


const MyPosts = ({ user }) => {
    const { retrievePostsByUserId } = usePost();
    const [myPosts, setMyPosts] = useState(() => {
        const savedPosts = localStorage.getItem('myPosts');
        return savedPosts ? JSON.parse(savedPosts) : [];
    });

    useEffect(() => {
        const fetchMyPosts = async (userId) => {
            const posts = await retrievePostsByUserId(userId);
            setMyPosts(posts);
            localStorage.setItem('myPosts', JSON.stringify(posts));
        }
        fetchMyPosts(jwtDecode(user).id);
    }, [retrievePostsByUserId, user]);


    return (
        <div className="my-posts">
            {myPosts.length > 0 ? (
                myPosts.map(post => (
                    <div key={post._id} className="my-post">
                        <h3>{post.title}</h3>
                        <p>{post.content}</p>
                    </div>
                ))
            ) : (
                <p>No posts yet</p>
            )}
        </div>
    )
}

export default MyPosts;
