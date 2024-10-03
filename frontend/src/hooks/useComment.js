import { useContext } from 'react';
import { CommentContext } from '../contexts/CommentContext';


const useComment = () => {
    return useContext(CommentContext);
}



export default useComment;
