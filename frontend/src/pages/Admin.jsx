
import { useEffect } from 'react';

import AdminNavbar from '../components/AdminNavbar';
import Footer from '../components/Footer';

import useAdmin from '../hooks/useAdmin';



const Admin = () => {
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
        <>
            <AdminNavbar />
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
                                <td>{user.username}</td>
                                <td>{user.email}</td>
                                <td>{user.role}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <Footer />
        </>
    )
}



export default Admin;
