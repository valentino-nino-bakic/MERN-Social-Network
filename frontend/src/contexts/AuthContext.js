
import { createContext, useState } from 'react';
import {
    loginUser,
    signupUser,
    uploadProfileImage,
    fetchUsersByUsername,
    fetchUserByUsername,
} from '../api/user';



const AuthContext = createContext();


const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(() => {
        const token = localStorage.getItem('token');
        return token ? token : null;
    });

    const [picture, setPicture] = useState('');

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
        setPicture('');
        localStorage.removeItem('token');
        localStorage.removeItem('allPosts');
        if (localStorage.getItem('profile-image')) {
            localStorage.removeItem('profile-image');
        }
    }



    const updateProfileImage = async (token, file) => {
        if (user) {
            const formData = new FormData();
            formData.append('profile-image', file);
            try {
                const data = await uploadProfileImage(token, formData);
                alert(data.message);
                setPicture(data.profileImageUrl);
                localStorage.setItem('profile-image', data.profileImageUrl);
                return data;
            } catch (error) {
                console.log(error);
            }
        }
    };



    const getUsersByUsername = async (query) => {
        try {
            const data = await fetchUsersByUsername(query);
            return data;
        } catch (error) {
            throw new Error(error.message);
        }
    }


    const getUserByUsername = async (query) => {
        try {
            const data = await fetchUserByUsername(query);
            return data;
        } catch (error) {
            throw new Error(error.message);
        }
    }



    return (
        <AuthContext.Provider
            value={{
                user,
                updateProfileImage,
                getUsersByUsername,
                getUserByUsername,
                picture,
                setPicture,
                login,
                signup,
                logout,
                loading,
                error
            }}
        >
            {children}
        </AuthContext.Provider>
    )
}



export { AuthContext, AuthProvider }
