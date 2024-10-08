import { Navigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';


const ProtectedRoute = ({ children }) => {
    const { user } = useAuth();
    return user && user !== null ? children : <Navigate to='/' />;
};


export default ProtectedRoute;
