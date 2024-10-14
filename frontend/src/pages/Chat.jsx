
import { useEffect } from 'react';
import { io } from 'socket.io-client';

const BASE_URL = process.env.REACT_APP_BASE_URL;
const socket = io(BASE_URL);



const Chat = () => {
    useEffect(() => {
        socket.on('connect', () => {
            console.log(`Connected ${socket.id}`);
        });

        socket.on('receive_message', data => {
            console.log(`Message from ${data.fromUserId}: ${data.message}`);
        });

        const sendMessage = (message, toUserId) => {
            socket.emit('private_message', { message, toUserId });
        };

        return () => {
            socket.disconnect();
        };
    }, []);

    
    return (
        <div>
            <div className="vh-100">
                <h1 className="text-center">Chat Page</h1>
            </div>
        </div>
    )
}



export default Chat;
