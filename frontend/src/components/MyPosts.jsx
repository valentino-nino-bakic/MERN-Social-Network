
import { jwtDecode } from 'jwt-decode';

import useAuth from '../hooks/useAuth';

import CreatePost from './CreatePost';
import SingleUserPosts from './SingleUserPosts';



const MyPosts = () => {
    const { user } = useAuth();

    return (
        <div className="container">
            <div className="row">
                <div className="col-2"></div>
                <div className="col-6">
                    <CreatePost />
                    <SingleUserPosts singleUserId={jwtDecode(user).id} />
                </div>
                <div className="col-4"></div>
            </div>
        </div>
    )
}




export default MyPosts;
