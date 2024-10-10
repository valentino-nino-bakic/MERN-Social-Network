const BASE_URL = process.env.REACT_APP_BASE_URL;

const API_ENDPOINTS = {
    LOGIN: `${BASE_URL}/login`,
    SIGNUP: `${BASE_URL}/signup`,
    POSTS: `${BASE_URL}/posts`,
    COMMENTS: `${BASE_URL}/comments`,
    LIKES: `${BASE_URL}/likes`,
    UPLOAD_PROFILE_IMAGE: `${BASE_URL}/upload-profile-image`
}


export default API_ENDPOINTS;
