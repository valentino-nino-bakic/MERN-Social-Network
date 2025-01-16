
const PostModal = ({
    post,
    handleGoToClickedImageProfile,
    formatDate,
    likeError,
    likes,
    comments,
    handleAddLike,
    user,
    jwtDecode,
    commentError,
    handleAddComment,

}) => {

    return (
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
                        <p className="text-muted custom-modal-trigger-p">
                            {comments[post._id].length} comments
                        </p>
                    ) : (
                        <p></p>
                    )}
                </div>
            </div>

            <hr />

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
                {/* {commentLoading && <p>Loading comments...</p>} */}
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
                <form className="d-flex align-items-center position-sticky bottom-0 bg-white comment-form" onSubmit={(e) => {
                    e.preventDefault();
                    handleAddComment(user, post._id, jwtDecode(user).id, e.target.elements.commentText.value);
                    e.target.elements.commentText.value = '';
                }}>
                    <textarea
                        className="form-control border-0"
                        name="commentText"
                        placeholder="Add a comment"
                    >
                    </textarea>
                    <button type="submit" className="btn btn-primary ms-2 rounded-circle d-flex align-items-center justify-content-center">
                        <i className="fa fa-paper-plane"></i>
                    </button>
                </form>
            </div>
        </div>
    )
}


export default PostModal;
