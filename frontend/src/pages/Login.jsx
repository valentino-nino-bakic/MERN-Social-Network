import { Link } from 'react-router-dom';
import { useState } from 'react';

import Button from '../components/Button';


const Login = () => {
    const [formData, setFormData] = useState({
        'login-username-or-email': '',
        'login-password': ''
    });

    const handleChange = e => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    }



    return (
        <>
            <section className="p-5 d-flex">
                <div className="container d-flex justify-content-center">
                    <div className="row">
                        <div className="text-black">
                            <div className="d-flex align-items-center h-custom-2 px-5 ms-xl-4 mt-5 pt-5 pt-xl-0 mt-xl-n5">
                                <form>
                                    <h4 className="fw-normal mb-3 pb-3">Log In</h4>
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
                                    </div>
                                    <div className="pt-1 mb-4">
                                        <Button type="submit" className="btn btn-primary btn-lg btn-block w-100">LOGIN</Button>
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
