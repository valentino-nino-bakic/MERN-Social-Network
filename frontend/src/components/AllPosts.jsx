import { useState, useEffect } from 'react';

import useAuth from '../hooks/useAuth';
import usePost from '../hooks/usePost';
import useComment from '../hooks/useComment';
import formatDate from '../utils/formatDate';




const AllPosts = () => {
    const { user } = useAuth();
    const [currentUserId, setCurrentUserId] = useState(null);

    const { posts, getPosts, loading: postLoading, error: postError } = usePost();
    const { comments, getComments, addNewComment, loading: commentLoading, error: commentError } = useComment();


    useEffect(() => {
        if (user) {
            try {
                const decoded = window.jwt_decode(user);
                setCurrentUserId(decoded.id);
            } catch (error) {
                console.log(error);
            }
        }
    }, [user]);


    useEffect(() => {
        const fetchAllPosts = async () => {
            await getPosts();
        }
        fetchAllPosts();
    }, [getPosts]);


    useEffect(() => {
        if (posts.length > 0) {
            posts.forEach(post => {
                getComments(post._id);
            });
        }
    }, [posts, getComments]);


    const handleAddComment = async (token, postId, author, content) => {
        await addNewComment(token, postId, author, content);
    };



    if (postLoading) {
        return <p>Loading posts...</p>;
    }

    if (postError) {
        return <p>Error loading posts: {postError}</p>;
    }

    return (
        <div className="container mt-5">
            {posts.length > 0 ? (
                posts.map(post => (
                    <div className="card my-3" key={post._id}>
                        <div className="card-body">
                            <div className="d-flex align-items-center gap-3 mb-3">
                                <div className="d-flex align-items-center">
                                    <img
                                        src={post.author.profileImageUrl}
                                        alt="User"
                                        className="rounded-circle me-2"
                                        style={{ width: '40px', height: '40px' }}
                                    />
                                    <strong>{post.author.username}</strong>
                                </div>
                                <span className="text-muted" style={{ fontSize: '0.9rem' }}>
                                    {formatDate(post.createdAt)}
                                </span>
                            </div>
                            <h5 className="card-title">{post.title}</h5>
                            <p className="card-text">{post.content}</p>


                            <div>
                                <h6>Comments:</h6>
                                {commentLoading && <p>Loading comments...</p>}
                                {comments[post._id] && comments[post._id].map(comment => (
                                    <div key={comment._id}>
                                        <img
                                            src={comment.author.profileImageUrl}
                                            alt="User"
                                            className="rounded-circle me-2"
                                            style={{ width: '25px', height: '25px' }}
                                        />
                                        <strong>{comment.author.username}</strong>
                                        <p>{comment.content}</p> 
                                    </div>
                                ))}
                                <form onSubmit={(e) => {
                                    e.preventDefault();
                                    handleAddComment(user, post._id, currentUserId, e.target.elements.commentText.value);
                                }}>
                                    <input name="commentText" placeholder="Add a comment" />
                                    <button type="submit">Submit</button>
                                </form>
                            </div>
                        </div>
                    </div>
                ))
            ) : (
                <div className="alert alert-info">There are no posts currently</div>
            )}
        </div>
    )


}



export default AllPosts;
