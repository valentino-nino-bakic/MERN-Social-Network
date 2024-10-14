const BASE_URL = process.env.REACT_APP_BASE_URL;

const API_ENDPOINTS = {
    LOGIN: `${BASE_URL}/api/login`,
    SIGNUP: `${BASE_URL}/api/signup`,
    POSTS: `${BASE_URL}/api/posts`,
    COMMENTS: `${BASE_URL}/api/comments`,
    LIKES: `${BASE_URL}/api/likes`,
    UPLOAD_PROFILE_IMAGE: `${BASE_URL}/api/upload-profile-image`,
    SEARCH_RESULTS: `${BASE_URL}/api/search-results`,
    USER: `${BASE_URL}/api/user`
}


export default API_ENDPOINTS;
