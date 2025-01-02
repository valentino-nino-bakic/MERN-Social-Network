
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

import useAuth from '../hooks/useAuth';
import useComment from '../hooks/useComment';
import useLike from '../hooks/useLike';
import formatDate from '../utils/formatDate';



const DisplayPosts = ({ posts }) => {
    const navigate = useNavigate();

    const { user } = useAuth();
    const { comments, getComments, addNewComment, loading: commentLoading, error: commentError } = useComment();
    const { likes, getLikes, addNewLike, loading: likeLoading, error: likeError } = useLike();

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
                    <div className="single-post card my-3" key={post._id}>
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
                            <p className="card-text">{post.content}</p>


                            <div className="container d-flex justify-content-between">
                                <div>
                                    {likeLoading && <p>Loading likes...</p>}
                                    {likeError && <p>Error loading likes: {likeError}</p>}
                                    {likes[post._id] && likes[post._id].length > 0 ? <><i className="fa-solid fa-thumbs-up" style={{ color: '#0073e6' }} ></i> <span className="text-muted">{likes[post._id].length}</span></> : ''}
                                </div>
                                <div>
                                    {comments[post._id] && comments[post._id].length > 0 ? <p className="text-muted">{comments[post._id].length} comments</p> : <p></p>}
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
                                        <button className="btn text-muted w-100 btn-custom">
                                            <i className="fa fa-comment"></i> Comment
                                        </button>
                                    </div>
                                </div>
                            </div>



                            <div className="comments px-4">
                                {commentLoading && <p>Loading comments...</p>}
                                {commentError && <p>Error loading comments: {commentError}</p>}

                                {comments[post._id] && comments[post._id].map(comment => (
                                    <div key={comment._id}>
                                        <img
                                            data-user-username={comment.author.username}
                                            onClick={handleGoToClickedImageProfile}
                                            src={comment.author.profileImageUrl}
                                            alt="User"
                                            className="rounded-circle me-2"
                                            style={{ width: '25px', height: '25px', objectFit: 'cover', cursor: 'pointer' }}
                                        />
                                        <strong>{comment.author.username}</strong>
                                        <span className="text-muted mx-3" style={{ fontSize: '0.9rem' }}>
                                            {formatDate(comment.createdAt)}
                                        </span>
                                        <p>{comment.content}</p>
                                    </div>
                                ))}
                                <form onSubmit={(e) => {
                                    e.preventDefault();
                                    handleAddComment(user, post._id, jwtDecode(user).id, e.target.elements.commentText.value);
                                    e.target.elements.commentText.value = '';
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
        </>
    )
}




export default DisplayPosts;
