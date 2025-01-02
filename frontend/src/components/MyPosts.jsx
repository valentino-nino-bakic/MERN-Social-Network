
import { jwtDecode } from 'jwt-decode';

import useAuth from '../hooks/useAuth';

import CreatePost from './CreatePost';
import SingleUserPosts from './SingleUserPosts';



const MyPosts = () => {
    const { user } = useAuth();

    return (
        <>
            <CreatePost />
            <SingleUserPosts singleUserId={jwtDecode(user).id} />
        </>
    )
}




export default MyPosts;
