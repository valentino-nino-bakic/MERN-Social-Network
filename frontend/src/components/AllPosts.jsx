import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

import CreatePost from './CreatePost';
import Button from './Button';

// import formatDate from '../utils/formatDate';

import useAuth from '../hooks/useAuth';
import usePost from '../hooks/usePost';
import useComment from '../hooks/useComment';
import useLike from '../hooks/useLike';

import DisplayPosts from '../components/DisplayPosts';





const AllPosts = () => {
    const { user } = useAuth();
    const navigate = useNavigate();

    const { posts, getPosts, loading: postLoading, error: postError } = usePost();
    const { comments, getComments, addNewComment, loading: commentLoading, error: commentError } = useComment();
    const { likes, getLikes, addNewLike, loading: likeLoading, error: likeError } = useLike();



    useEffect(() => {
        const fetchAllPosts = async () => {
            await getPosts();
        }
        fetchAllPosts();
    }, [getPosts]);



    // useEffect(() => {
    //     if (posts.length > 0) {
    //         posts.forEach(post => {
    //             getComments(post._id);
    //             getLikes(post._id);
    //         });
    //     }
    // }, [posts, getComments, getLikes]);



    // const handleAddComment = async (token, postId, author, content) => {
    //     await addNewComment(token, postId, author, content);
    // };
    // const handleAddLike = async (token, postId, author) => {
    //     await addNewLike(token, postId, author);
    // };


    // const handleGoToClickedImageProfile = e => {
    //     const username = e.target.getAttribute('data-user-username');
    //     const decodedUser = jwtDecode(user);
    //     if (decodedUser && username === decodedUser.username) {
    //         navigate('/home/profile');
    //     } else {
    //         navigate(`/home/user/${username}`);
    //     }
    // }


    if (postLoading) {
        return <p>Loading posts...</p>;
    }

    if (postError) {
        return <p>Error loading posts: {postError}</p>;
    }

    return (
        <div className="container-fluid posts-page-wrapper">
            <div className="row">
                <div className="col-3">
                    <div className="sticky-top" style={{ top: '86px' }}>
                        <div className="list-group">
                            <Link className="list-group-item list-group-item-action border-0 p-3 rounded btn-custom" to="profile">Profile</Link>
                            <Link className="list-group-item list-group-item-action border-0 p-3 rounded btn-custom" to="messages">Messages</Link>
                            <Link className="list-group-item list-group-item-action border-0 p-3 rounded btn-custom" to="friends">Friends</Link>
                        </div>
                    </div>
                </div>
                <div className="col-6">
                    <CreatePost />
                    <DisplayPosts posts={posts}/>
                </div>
            </div>
        </div>
    )


}



export default AllPosts;
