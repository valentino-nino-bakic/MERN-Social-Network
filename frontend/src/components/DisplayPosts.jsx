
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

import useAuth from '../hooks/useAuth';
import useComment from '../hooks/useComment';
import useLike from '../hooks/useLike';
import { formatDate } from '../utils/formatDate';

import useModal from '../hooks/useModal';
import Modal from './common/Modal';
import PostModal from './PostModal';


const DisplayPosts = ({ posts }) => {
    const navigate = useNavigate();

    const { user } = useAuth();
    const { comments, getComments, addNewComment, loading: commentLoading, error: commentError } = useComment();
    const { likes, getLikes, addNewLike, loading: likeLoading, error: likeError } = useLike();


    const { openModal } = useModal();

    const handleOpenModal = post => {
        openModal(
            <PostModal
                post={post}
                handleGoToClickedImageProfile={handleGoToClickedImageProfile}
                formatDate={formatDate}
                likeError={likeError}
                likes={likes}
                comments={comments}
                handleAddLike={handleAddLike}
                user={user}
                jwtDecode={jwtDecode}
                commentError={commentError}
                handleAddComment={handleAddComment}
            />
        )
    }


    useEffect(() => {
        if (posts.length > 0) {
            posts.forEach(post => {
                getComments(post._id);
                getLikes(post._id);
            });
        }
    }, [posts, getComments, getLikes]);


    const handleAddComment = async (token, postId, author, content) => {
        await addNewComment(token, postId, author, content);
    };
    const handleAddLike = async (token, postId, author) => {
        await addNewLike(token, postId, author);
    };

    const handleGoToClickedImageProfile = e => {
        const username = e.target.getAttribute('data-user-username');
        const decodedUser = jwtDecode(user);
        if (decodedUser && username === decodedUser.username) {
            navigate('/home/profile');
        } else {
            navigate(`/home/user/${username}`);
        }
    }



    return (
        <>
            {posts.length > 0 ? (
                posts.map(post => (
                    <div key={post._id} className="card mb-5 single-post">
                        <div className="card-body">

                            <div className="d-flex align-items-center gap-3 mb-3">
                                <div className="d-flex align-items-center">
                                    <img
                                        data-user-username={post.author.username}
                                        onClick={handleGoToClickedImageProfile}
                                        src={post.author.profileImageUrl}
                                        alt="User"
                                        className="rounded-circle me-2"
                                        style={{ width: '40px', height: '40px', objectFit: 'cover', cursor: 'pointer' }}
                                    />
                                    <strong>{post.author.username}</strong>
                                </div>
                                <span className="text-muted" style={{ fontSize: '0.9rem' }}>
                                    {formatDate(post.createdAt)}
                                </span>
                            </div>
                            <h5 className="card-title">{post.title}</h5>
                            <p className="card-text py-3">{post.content}</p>


                            <div className="container d-flex justify-content-between">
                                <div>
                                    {/* {likeLoading && <p>Loading likes...</p>} */}
                                    {likeError && <p>Error loading likes: {likeError}</p>}
                                    {likes[post._id] && likes[post._id].length > 0 ? (
                                        <button
                                            data-bs-toggle="modal"
                                            data-bs-target={`#likesModal-${post._id}`}
                                            style={{ background: 'transparent', border: 'none' }}
                                        >
                                            <i className="fa-solid fa-thumbs-up" style={{ color: '#0073e6' }}></i>
                                            <span className="text-muted"> {likes[post._id].length}</span>
                                        </button>
                                    ) : (
                                        ''
                                    )}
                                    <div className="modal fade" id={`likesModal-${post._id}`} tabIndex="-1" aria-labelledby={`likesModalLabel-${post._id}`} aria-hidden="true">
                                        <div className="modal-dialog">
                                            <div className="modal-content">
                                                <div className="modal-header">
                                                    <h5 className="modal-title" id={`likesModalLabel-${post._id}`}>Likes</h5>
                                                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                                </div>
                                                <div className="modal-body">
                                                    {likes[post._id] && likes[post._id].map(like => (
                                                        <div key={like._id} className="d-flex align-items-center my-2 p-1">
                                                            <div className="position-relative">
                                                                <img
                                                                    data-bs-dismiss="modal"
                                                                    data-user-username={like.author.username}
                                                                    onClick={handleGoToClickedImageProfile}
                                                                    src={like.author.profileImageUrl}
                                                                    alt="User"
                                                                    className="rounded-circle"
                                                                    style={{ width: '45px', height: '45px', objectFit: 'cover', cursor: 'pointer' }}
                                                                />
                                                                <i
                                                                    className="fa fa-thumbs-up position-absolute"
                                                                    style={{ backgroundColor: '#0073e6', color: 'white', fontSize: '10px', padding: '3px', borderRadius: '50%', bottom: '0', right: '0' }}>
                                                                </i>
                                                            </div>
                                                            <button
                                                                type="button"
                                                                className="btn btn-link"
                                                                data-bs-dismiss="modal"
                                                                data-user-username={like.author.username}
                                                                onClick={handleGoToClickedImageProfile}
                                                            >
                                                                {like.author.username}
                                                            </button>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    {comments[post._id] && comments[post._id].length > 0 ? (
                                        <p className="text-muted custom-modal-trigger-p" onClick={() => handleOpenModal(post)}>
                                            {comments[post._id].length} comments
                                        </p>
                                    ) : (
                                        <p></p>
                                    )}
                                </div>
                            </div>



                            <div className="container my-4">
                                <div className="row">
                                    <div className="col text-center">
                                        <button
                                            className="btn text-muted w-100 btn-custom"
                                            onClick={() => handleAddLike(user, post._id, jwtDecode(user).id)}
                                        > <i className="fa fa-thumbs-up"></i> Like
                                        </button>
                                    </div>
                                    <div className="col text-center">
                                        <button onClick={() => handleOpenModal(post)} className="btn text-muted w-100 btn-custom">
                                            <i className="fa fa-comment"></i> Comment
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <Modal />
                    </div>
                ))
            ) : (
                <div className="alert alert-info">There are no posts currently</div>
            )}
        </>
    )
}




export default DisplayPosts;
