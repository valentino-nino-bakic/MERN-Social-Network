
import { useState, useEffect } from 'react';

import useAdmin from '../../hooks/useAdmin';



const EditUserModal = ({ userData }) => {
    const { modifyUser, alertMessage } = useAdmin();

    const [currentUsername, setCurrentUsername] = useState('');
    const [currentRole, setCurrentRole] = useState('');

    const [newUsername, setNewUsername] = useState('');
    const [newRole, setNewRole] = useState('user');


    useEffect(() => {
        if (userData) {
            setCurrentUsername(userData.username);
            setCurrentRole(userData.role);
        }
    }, [userData]);


    const handleSubmit = async e => {
        e.preventDefault();
        try {
            if (userData) {
                await modifyUser(userData._id, newUsername, newRole);
                setNewUsername('');
                setNewRole('user');
            }
        } catch (err) {
            alert(err);
        }
    }


    return (
        <>
            {alertMessage && (
                <div className="alert alert-success show fade fixed-alert" role="alert">
                    {alertMessage}
                </div>
            )}
            <div className="modal fade" id={`userModal-${userData._id}`} tabIndex="-1" aria-labelledby={`userModalLabel-${userData._id}`} aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="exampleModalLabel">Edit User</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form onSubmit={handleSubmit}>
                                <div className="mb-3">
                                    <p>Current Username: <span className="text-info fw-bold">{currentUsername}</span></p>
                                    <label htmlFor="newUsername" className="form-label">New</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="newUsername"
                                        value={newUsername}
                                        onChange={(e) => setNewUsername(e.target.value)}
                                    />
                                </div>
                                <div className="mb-3">
                                    <p>Current Role: <span className="text-info fw-bold">{currentRole}</span></p>
                                    <label htmlFor="newRole" className="form-label">new</label>
                                    <select
                                        id="newRole"
                                        className="form-select"
                                        value={newRole}
                                        onChange={(e) => setNewRole(e.target.value)}
                                    >
                                        <option value="user">User</option>
                                        <option value="admin">Admin</option>
                                    </select>
                                </div>
                                <button type="submit" className="btn btn-primary mt-3" data-bs-dismiss="modal">Save changes</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}



export default EditUserModal;
