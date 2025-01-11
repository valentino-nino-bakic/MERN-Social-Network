import { useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';

import Button from '../components/Button';
import { isUsernameValid, isEmailValid, isPasswordValid } from '../utils/validation';
import useAuth from '../hooks/useAuth';



const SignupForm = ({ greeting = 'Sign Up' }) => {
    const { user, signup, loading, error } = useAuth();
    const [formData, setFormData] = useState({
        'signup-username': '',
        'signup-email': '',
        'signup-password': ''
    });
    const navigate = useNavigate();

    const [formErrors, setFormErrors] = useState({
        usernameErrorMessage: '',
        passwordErrorMessage: ''
    });


    const handleChange = e => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));

        if (name === 'signup-username') {
            if (!isUsernameValid(value)) {
                setFormErrors(prev => ({
                    ...prev,
                    usernameErrorMessage: 'Username must have minimum 4 and maximum 20 characters'
                }));
            } else {
                setFormErrors(prev => ({
                    ...prev,
                    usernameErrorMessage: ''
                }));
            }
        }

        if (name === 'signup-password') {
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


    const handleSubmit = async e => {
        e.preventDefault();
        try {
            if (isUsernameValid(formData['signup-username']) && isEmailValid(formData['signup-email']) && isPasswordValid(formData['signup-password'])) {
                await signup(formData['signup-username'], formData['signup-email'], formData['signup-password']);
                navigate('/login');
            } else {
                alert('Make sure your inputs are valid');
            }
        } catch (error) {
            console.log(error);
        }
    }


    if (user) {
        return <Navigate to='/home' />
    }

    return (
        <>
            <div className="d-flex align-items-center justify-content-center h-custom-2 px-5 ms-xl-4 mt-5 pt-5 pt-xl-0 mt-xl-n5">
                <form onSubmit={handleSubmit}>
                    <h4 className="fw-normal mb-3 pb-3">{greeting}</h4>
                    {error && <p className="text-danger">{error}</p>}
                    <div data-mdb-input-init className="form-outline mb-4">
                        <label className="form-label" htmlFor="signup-username">Username</label>
                        <input
                            type="text"
                            id="signup-username"
                            name="signup-username"
                            value={formData['signup-username']}
                            onChange={handleChange}
                            className="form-control form-control-lg"
                        />
                        {formErrors['usernameErrorMessage'] && <p className="text-danger">{formErrors['usernameErrorMessage']}</p>}
                    </div>
                    <div data-mdb-input-init className="form-outline mb-4">
                        <label className="form-label" htmlFor="signup-email">Email address</label>
                        <input
                            type="email"
                            id="signup-email"
                            name="signup-email"
                            value={formData['signup-email']}
                            onChange={handleChange}
                            className="form-control form-control-lg"
                        />
                    </div>
                    <div data-mdb-input-init className="form-outline mb-4">
                        <label className="form-label" htmlFor="signup-password">Password</label>
                        <input
                            type="password"
                            id="signup-password"
                            name="signup-password"
                            value={formData['signup-password']}
                            onChange={handleChange}
                            className="form-control form-control-lg"
                        />
                        {formErrors['passwordErrorMessage'] && <p className="text-danger">{formErrors['passwordErrorMessage']}</p>}
                    </div>
                    <div className="pt-1 mb-4">
                        <Button type="submit" className="btn btn-primary btn-lg btn-block w-100" disabled={loading}>SIGNUP</Button>
                    </div>
                </form>
            </div>
        </>
    )
}



export default SignupForm;
