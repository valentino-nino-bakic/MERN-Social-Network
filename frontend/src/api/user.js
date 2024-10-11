import API_ENDPOINTS from './constants';



const loginUser = async (usernameOrEmail, password) => {
    const requestBody = {
        usernameOrEmail,
        password
    }

    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody)
    }

    try {
        const response = await fetch(API_ENDPOINTS.LOGIN, options);
        if (!response.ok) {
            const data = await response.json();
            throw new Error(data.message);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        throw error;
    }
}



const signupUser = async (username, email, password) => {
    const requestBody = {
        username,
        email,
        password
    }

    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody)
    }

    try {
        const response = await fetch(API_ENDPOINTS.SIGNUP, options);
        if (!response.ok) {
            const data = await response.json();
            throw new Error(data.message);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        throw error;
    }
}



const uploadProfileImage = async (token, formData) => {
    const options = {
        method: 'POST',
        headers: {
            Authorization: `Bearer ${token}`
        },
        body: formData
    }
    try {
        const response = await fetch(API_ENDPOINTS.UPLOAD_PROFILE_IMAGE, options);
        if (!response.ok) {
            const data = await response.json();
            throw new Error(data.message);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        throw error;
    }
}


export { loginUser, signupUser, uploadProfileImage };
