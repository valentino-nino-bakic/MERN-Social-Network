
import { useEffect } from 'react';

import useSocket from '../hooks/useSocket';
import useAuth from '..hooks/useAuth';



const Messages = () => {
    const { socket, privateMessage } = useSocket();
    const { user } = useAuth();


    return (
        <div>
            <div className="vh-100">
                <h1 className="text-center">Messages Page</h1>
            </div>
        </div>
    )
}



export default Messages;
