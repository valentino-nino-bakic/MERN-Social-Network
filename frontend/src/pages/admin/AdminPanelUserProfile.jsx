
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
// import { jwtDecode } from 'jwt-decode';

import useAdmin from '../../hooks/useAdmin';
// import useAuth from '../../hooks/useAuth';

import SingleUserPosts from '../../components/SingleUserPosts';
import EditUserModal from '../../components/admin/EditUserModal';



const AdminPanelUserProfile = () => {
    // const { user } = useAuth();
    const { fetchUser } = useAdmin();
    const { id } = useParams();

    const [profileData, setProfileData] = useState(null);
    const [userLoading, setUserLoading] = useState(true);
    const [error, setError] = useState(null);


    useEffect(() => {
        const fetchSingleUser = async userId => {
            setUserLoading(true);
            setError(null);
            try {
                const data = await fetchUser(userId);
                setProfileData(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setUserLoading(false);
            }
        }
        if (id) {
            fetchSingleUser(id);
        } else {
            setProfileData(null);
            setUserLoading(false);
        }
    }, [id, fetchUser]);




    if (userLoading) {
        return (
            <div className="d-flex justify-content-center">
                <div className="spinner-border" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
            </div>
        )
    }

    if (error) {
        return <div>Error: {error}</div>
    }


    return (
        <>
            <div className="container-fluid p-0">

                <div className="position-relative d-flex align-items-center bg-image-holder">
                    <div className="position-absolute d-flex align-items-center px-5" style={{ bottom: '-80px' }}>
                        <div className="position-relative" style={{ width: '200px', height: '200px' }}>
                            <img
                                src={profileData.profileImageUrl}
                                alt={profileData.username}
                                className="rounded-circle border border-3"
                                style={{ width: '200px', height: '200px', objectFit: 'cover' }}
                            />
                        </div>
                        <h1 className="ms-3 text-white pb-5">{profileData.username}</h1>
                    </div>
                </div>

                <div className="container position-relative">
                    <div className="row">
                        <div className="col-3"></div>
                        <div className="col-2">
                            <button
                                data-bs-toggle="modal"
                                data-bs-target={`#userModal-${profileData._id}`}
                                className="btn btn-primary position-absolute"
                                style={{ bottom: '20px' }}
                            >
                                <i className="fa fa-user-edit"></i> Edit User
                            </button>
                        </div>
                        <div className="col-7"></div>
                    </div>
                </div>

            </div>
            <div className="container mt-5">
                <div className="row">
                    <div className="col-2"></div>
                    <div className="col-6">
                        <SingleUserPosts singleUserId={profileData._id} />
                    </div>
                    <div className="col-4"></div>
                </div>
            </div>
            <EditUserModal userData={profileData} />
        </>
    )
}



export default AdminPanelUserProfile;
