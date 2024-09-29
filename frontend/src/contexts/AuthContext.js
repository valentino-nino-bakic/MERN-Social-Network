import { createContext, useState } from 'react';
import { loginUser, signupUser } from '../api/user';


const AuthContext = createContext();


const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(() => {
        const token = localStorage.getItem('token');
        return token ? token : null;
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);


    const login = async (usernameOrEmail, password) => {
        setLoading(true);
        setError(null);
        try {
            const data = await loginUser(usernameOrEmail, password);
            setUser(data.token);
            alert(data.message);
            localStorage.setItem('token', data.token);
            setLoading(false);
        } catch (error) {
            setError(error.message);
            setLoading(false);
        }
    }


    const signup = async (username, email, password) => {
        setLoading(true);
        setError(null);
        try {
            const data = await signupUser(username, email, password);
            alert(data.message);
            setLoading(false);
        } catch (error) {
            setError(error.message);
            setLoading(false);
        }
    }


    const logout = () => {
        setUser(null);
        localStorage.removeItem('token');
    }


    return (
        <AuthContext.Provider value={{ user, login, signup, logout, loading, error }}>
            {children}
        </AuthContext.Provider>
    )
}



export { AuthContext, AuthProvider }
