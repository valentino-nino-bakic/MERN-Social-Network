import SignupForm from '../components/SignupForm';
import { Link } from 'react-router-dom';

const Signup = () => {
    return (
        <>
            <SignupForm />
            <p className="mx-auto mb-5 text-center">Already have an account? <Link to='/login' className="link-info">Login</Link></p>
        </>
    )
}


export default Signup;
