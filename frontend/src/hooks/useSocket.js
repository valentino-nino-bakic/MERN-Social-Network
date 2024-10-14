import { useContext } from 'react';
import { SocketContext } from '../contexts/SocketContext';


const useSocket = () => {
    return useContext(SocketContext);
}



export default useSocket;
