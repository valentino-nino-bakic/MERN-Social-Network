
import { useEffect } from 'react';

import useAdmin from '../../hooks/useAdmin';



const AllUsers = () => {
    const { users, fetchUsers } = useAdmin();

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



    return (
        <div className="container mt-4">
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
                            <td><img src={user.profileImageUrl} style={{ width: '30px', height: '30px', objectFit: 'cover', borderRadius: '50%', marginRight: '10px' }} />{user.username}</td>
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
