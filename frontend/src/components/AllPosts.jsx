import { useEffect } from 'react';
import { Link } from 'react-router-dom';

import usePost from '../hooks/usePost';

import CreatePost from './CreatePost';
import DisplayPosts from '../components/DisplayPosts';



const AllPosts = () => {
    const { posts, getPosts, loading: postLoading, error: postError } = usePost();

    useEffect(() => {
        const fetchAllPosts = async () => {
            await getPosts();
        }
        fetchAllPosts();
    }, [getPosts]);


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
                    <div className="sticky-top" style={{ top: '100px' }}>
                        <div className="list-group">
                            <Link className="list-group-item list-group-item-action border-0 p-3 rounded btn-custom" to="profile">Profile</Link>
                            <Link className="list-group-item list-group-item-action border-0 p-3 rounded btn-custom" to="messages">Messages</Link>
                        </div>
                    </div>
                </div>
                <div className="col-6">
                    <CreatePost />
                    <DisplayPosts posts={posts}/>
                </div>
                <div className="col-3"></div>
            </div>
        </div>
    )
}



export default AllPosts;
