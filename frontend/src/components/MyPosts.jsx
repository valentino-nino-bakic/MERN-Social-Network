
import { jwtDecode } from 'jwt-decode';

import useAuth from '../hooks/useAuth';

import CreatePost from './CreatePost';
import SingleUserPosts from './SingleUserPosts';



const MyPosts = () => {
    const { user } = useAuth();

    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-4"></div>
                <div className="col-4">
                    <div style={{minWidth: '634px'}}>
                        <CreatePost />
                        <SingleUserPosts singleUserId={jwtDecode(user).id} />
                    </div>
                </div>
                <div className="col-4"></div>
            </div>
        </div>
    )
}




export default MyPosts;
