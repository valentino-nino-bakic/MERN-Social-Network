import { useContext } from 'react';
import { LikeContext } from '../contexts/LikeContext';


const useLike = () => {
    return useContext(LikeContext);
}



export default useLike;
