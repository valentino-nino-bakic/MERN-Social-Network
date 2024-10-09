
import { useState, useEffect } from 'react';

import useAuth from '../hooks/useAuth';




const Profile = () => {
    const { user } = useAuth();
    const [userInfo, setUserInfo] = useState({});


    useEffect(() => {
        if (user) {
            try {
                const decoded = window.jwt_decode(user);
                setUserInfo(decoded);
            } catch (error) {
                console.log(error);
            }
        }
    }, [user]);



    return (
        <div className="container-fluid p-0">

            <div className="position-relative d-flex align-items-center" style={{ height: '40vh', backgroundColor: '#525252'}}>
                <div className="position-absolute d-flex align-items-center px-5" style={{ bottom: '-80px'}}>
                    <img
                        src={userInfo.profileImageUrl}
                        alt="User"
                        className="rounded-circle border border-1 border-white"
                        style={{ width: '200px', height: '200px', objectFit: 'cover' }}
                    />
                    <h1 className="ms-3 text-white pb-5">{userInfo.username}</h1>
                </div>
            </div>

            <div className="container vh-100 d-flex justify-content-center align-items-center">
                <p>PRofile page</p>
            </div>

        </div>
    )
}




export default Profile;
