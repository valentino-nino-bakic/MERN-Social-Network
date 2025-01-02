import { useState, useEffect } from 'react';

import usePost from '../hooks/usePost';
import DisplayPosts from './DisplayPosts';




const SingleUserPosts = ({ singleUserId }) => {
    const { retrievePostsByUserId } = usePost();

    const [singleUserPosts, setSingleUserPosts] = useState(() => {
        const savedPosts = localStorage.getItem('singleUserPosts');
        return savedPosts ? JSON.parse(savedPosts) : [];
    });


    useEffect(() => {
        const fetchPosts = async userId => {
            const posts = await retrievePostsByUserId(userId);
            setSingleUserPosts(posts);
            localStorage.setItem('singleUserPosts', JSON.stringify(posts));
        }
        fetchPosts(singleUserId);
    }, [retrievePostsByUserId, singleUserId]);



    
    return (
        <>
            <div>
                <DisplayPosts posts={singleUserPosts} />
            </div>
        </>
    )
}




export default SingleUserPosts;
