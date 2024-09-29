
import { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';

import useAuth from '../hooks/useAuth';
import { getAllPosts } from '../api/post';
import AllPosts from '../components/AllPosts';



const Profile = () => {
    const { user } = useAuth();
    const [allPosts, setAllPosts] = useState([]);

    useEffect(() => {
        const fetchAllPosts = async () => {
            const data = await getAllPosts();
            setAllPosts(data.posts);
        }
        fetchAllPosts();
    }, []);



    if (!user) {
        return <Navigate to='/' />
    }
    

    return allPosts.length > 0 ? (
        <div className="container vh-100">
            <AllPosts posts={allPosts}/>
        </div>
    ) : (
        <div className="container vh-100">
            <p>nema postova u bazi</p>
        </div>
    )
}



export default Profile;
