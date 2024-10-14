
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import useAuth from '../hooks/useAuth';



const OtherUserProfile = () => {
    const { getUserByUsername } = useAuth();
    const { username } = useParams();

    const [profileData, setProfileData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);


    useEffect(() => {
        const fetchUser = async () => {
            setLoading(true);
            setError(null);
            try {
                const data = await getUserByUsername(username);
                setProfileData(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };
        if (username) {
            fetchUser();
        } else {
            setProfileData(null);
            setLoading(false);
        }

        fetchUser();
    }, [username, getUserByUsername]);




    if (loading) {
        return <div>Loading...</div>
    }

    if (error) {
        return <div>Error: {error}</div>
    }

    return (
        <div className="container-fluid p-0">

            <div className="position-relative d-flex align-items-center bg-image-holder">
                <div className="position-absolute d-flex align-items-center px-5" style={{ bottom: '-80px' }}>
                    <div className="position-relative" style={{ width: '200px', height: '200px' }}>
                        <img
                            src={profileData.profileImageUrl}
                            alt="User"
                            className="rounded-circle border border-3"
                            style={{ width: '200px', height: '200px', objectFit: 'cover' }}
                        />
                    </div>
                    <h1 className="ms-3 text-white pb-5">{profileData.username}</h1>
                </div>
            </div>


            <div className="vh-100 d-flex align-items-center justify-content-center">
                <h1>Random Profile Page</h1>
            </div>



        </div>
    )
}




export default OtherUserProfile;
