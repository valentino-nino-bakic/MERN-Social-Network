import { createContext, useState } from 'react';
import loginUser from '../api/user';


const AuthContext = createContext();


const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const login = async (usernameOrEmail, password) => {
        setLoading(true);
        setError(null);
        try {
            const data = await loginUser(usernameOrEmail, password);
            setUser(data.token);
            setLoading(false);
        } catch (error) {
            setError(error.message);
            setLoading(false);
        }
    }

    const logout = () => {
        setUser(null);
    }


    return (
        <AuthContext.Provider value={{ user, login, logout, loading, error }}>
            {children}
        </AuthContext.Provider>
    )
}



export { AuthContext, AuthProvider }
