import { Link, Navigate } from 'react-router-dom';
import { useState } from 'react';
import { jwtDecode } from 'jwt-decode';

import Button from '../components/Button';
import { isPasswordValid } from '../utils/validation';
import useAuth from '../hooks/useAuth';



const Login = () => {
    const [formData, setFormData] = useState({
        'login-username-or-email': '',
        'login-password': ''
    });
    const { user, login, loading, error } = useAuth();

    const [formErrors, setFormErrors] = useState({
        usernameOrEmailErrorMessage: '',
        passwordErrorMessage: ''
    });

    const handleChange = e => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
        if (name === 'login-username-or-email') {
            if (value.trim().length < 4) {
                setFormErrors(prev => ({
                    ...prev,
                    usernameOrEmailErrorMessage: 'Field too short'
                }));
            } else {
                setFormErrors(prev => ({
                    ...prev,
                    usernameOrEmailErrorMessage: ''
                }));
            }
        }

        if (name === 'login-password') {
            if (!isPasswordValid(value)) {
                setFormErrors(prev => ({
                    ...prev,
                    passwordErrorMessage: 'Password must be at least 8 characters'
                }));
            } else {
                setFormErrors(prev => ({
                    ...prev,
                    passwordErrorMessage: ''
                }));
            }
        }
    }


    const handleSubmit = e => {
        e.preventDefault();
        if (isPasswordValid(formData['login-password']) && formData['login-username-or-email'].length > 3) {
            login(formData['login-username-or-email'], formData['login-password']);
        } else {
            alert('Make sure your inputs are valid');
        }
    }


    if (user) {
        if (jwtDecode(user).role === 'admin') {
            return <Navigate to='/admin' />;
        } else {
            return <Navigate to='/home' />;
        }
    }


    return (
        <>
            <section className="p-5 d-flex">
                <div className="container d-flex justify-content-center">
                    <div className="row">
                        <div className="text-black">
                            <div className="d-flex align-items-center h-custom-2 px-5 ms-xl-4 mt-5 pt-5 pt-xl-0 mt-xl-n5">
                                <form onSubmit={handleSubmit}>
                                    <h4 className="fw-normal mb-3 pb-3">Log In</h4>
                                    {error && <p className="text-danger">{error}</p>}
                                    <div data-mdb-input-init className="form-outline mb-4">
                                        <label className="form-label" htmlFor="login-username-or-email">Username or Email</label>
                                        <input
                                            type="text"
                                            id="login-username-or-email"
                                            name="login-username-or-email"
                                            value={formData['login-username-or-email']}
                                            onChange={handleChange}
                                            className="form-control form-control-lg"
                                        />
                                        {formErrors['usernameOrEmailErrorMessage'] && <p className="text-danger">{formErrors['usernameOrEmailErrorMessage']}</p>}
                                    </div>
                                    <div data-mdb-input-init className="form-outline mb-4">
                                        <label className="form-label" htmlFor="login-password">Password</label>
                                        <input
                                            type="password"
                                            id="login-password"
                                            name="login-password"
                                            value={formData['login-password']}
                                            onChange={handleChange}
                                            className="form-control form-control-lg"
                                        />
                                        {formErrors['passwordErrorMessage'] && <p className="text-danger">{formErrors['passwordErrorMessage']}</p>}
                                    </div>
                                    <div className="pt-1 mb-4">
                                        <Button type="submit" className="btn btn-primary btn-lg btn-block w-100" disabled={loading}>LOGIN</Button>
                                    </div>
                                    <p>Don't have an account? <Link to='/signup' className="link-info">Sign up</Link></p>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}



export default Login;
