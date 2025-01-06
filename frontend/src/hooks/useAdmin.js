import { useContext } from 'react';
import { AdminContext } from '../contexts/AdminContext';


const useAdmin = () => {
    return useContext(AdminContext);
}



export default useAdmin;
