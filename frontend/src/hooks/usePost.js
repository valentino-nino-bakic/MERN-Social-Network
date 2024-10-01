import { useContext } from 'react';
import { PostContext } from '../contexts/PostContext';


const usePost = () => {
    return useContext(PostContext);
}



export default usePost;
