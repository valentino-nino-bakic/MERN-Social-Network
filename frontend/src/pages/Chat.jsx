
import { useEffect } from 'react';

import useSocket from '../hooks/useSocket';



const Chat = () => {
    const socket = useSocket();

    useEffect(() => {
        if (!socket) return;

        socket.on('receive_message', (data) => {
            console.log(`Message from ${data.fromUserId}: ${data.message}`);
        });

        return () => {
            socket.off('receive_message');
        };
    }, [socket]);


    return (
        <div>
            <div className="vh-100">
                <h1 className="text-center">Chat Page</h1>
            </div>
        </div>
    )
}



export default Chat;
