import { useEffect } from 'react';

import usePost from '../hooks/usePost';
import formatDate from '../utils/formatDate';


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
                                    <span>{post.author.username}</span>
                                </div>
                                <span className="text-muted" style={{ fontSize: '0.9rem' }}>
                                    {formatDate(post.createdAt)}
                                </span>
                            </div>
                            <h5 className="card-title">{post.title}</h5>
                            <p className="card-text">{post.content}</p>
                        </div>
                    </div>
                ))
            ) : (
                <div className="alert alert-info">Nema postova u bazi</div>
            )}
        </div>
    )


}



export default AllPosts;
