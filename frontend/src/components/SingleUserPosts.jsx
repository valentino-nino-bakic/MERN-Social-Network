import { useState, useEffect } from 'react';
// import { jwtDecode } from 'jwt-decode';

// import useAuth from '../hooks/useAuth';
import usePost from '../hooks/usePost';
import useComment from '../hooks/useComment';
import useLike from '../hooks/useLike';
import DisplayPosts from './DisplayPosts';




const SingleUserPosts = ({ singleUserId }) => {
    // const { user } = useAuth();
    const { comments, getComments, addNewComment, loading: commentLoading, error: commentError } = useComment();
    const { likes, getLikes, addNewLike, loading: likeLoading, error: likeError } = useLike();
    const { retrievePostsByUserId } = usePost();

    const [singleUserPosts, setSingleUserPosts] = useState(() => {
        const savedPosts = localStorage.getItem('singleUserPosts');
        return savedPosts ? JSON.parse(savedPosts) : [];
    });


    useEffect(() => {
        const fetchPosts = async (userId) => {
            const posts = await retrievePostsByUserId(userId);
            setSingleUserPosts(posts);
            localStorage.setItem('singleUserPosts', JSON.stringify(posts));
        }
        fetchPosts(singleUserId);
    }, [retrievePostsByUserId, singleUserId]);

    useEffect(() => {
        if (singleUserPosts.length > 0) {
            singleUserPosts.forEach(post => {
                getComments(post._id);
                getLikes(post._id);
            });
        }
    }, [singleUserPosts, getComments, getLikes]);


    
    return (
        <>
            <div className="single-user-posts">
                <DisplayPosts posts={singleUserPosts} />
            </div>
        </>
    )
}




export default SingleUserPosts;
