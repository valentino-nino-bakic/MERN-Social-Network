
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

import useAdmin from '../../hooks/useAdmin';
import useAuth from '../../hooks/useAuth';


const AllUsers = () => {
    const navigate = useNavigate();
    const { users, fetchUsers } = useAdmin();
    const { user } = useAuth();


    useEffect(() => {
        const fetchAllUsers = async () => {
            try {
                await fetchUsers();
            } catch (error) {
                console.log(error);
            }
        }
        fetchAllUsers();
    }, [users, fetchUsers]);



    const handleGoToUserProfile = e => {
        const userId = e.target.getAttribute('data-user-id');
        if (user && userId === jwtDecode(user).id) {
            navigate('/admin/profile');
        } else {
            navigate(`/admin/users/${userId}`);
        }
    }


    return (
        <div className="container mt-4">
            <h3 className="my-5">All Users</h3>
            <table className="table table-striped table-bordered">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Username</th>
                        <th scope="col">Email</th>
                        <th scope="col">Role</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user, index) => (
                        <tr key={user._id}>
                            <th scope="row">{index + 1}</th>
                            <td>
                                <img src={user.profileImageUrl} alt={user.username} style={{ width: '30px', height: '30px', objectFit: 'cover', borderRadius: '50%' }} />
                                <button data-user-id={user._id} onClick={handleGoToUserProfile} type="button" className="btn btn-link">{user.username}</button>
                            </td>
                            <td>{user.email}</td>
                            <td>{user.role}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}




export default AllUsers;
