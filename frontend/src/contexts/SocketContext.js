import { createContext, useEffect, useState } from 'react';
import { io } from 'socket.io-client';

const BASE_URL = process.env.REACT_APP_BASE_URL;

const SocketContext = createContext();


const SocketProvider = ({ children }) => {
    const [socket, setSocket] = useState(null);

    useEffect(() => {
        const socketInstance = io(BASE_URL);
        setSocket(socketInstance);

        return () => {
            socketInstance.disconnect();
        };
    }, []);


    return (
        <SocketContext.Provider value={socket}>
            {children}
        </SocketContext.Provider>
    );
};



export { SocketContext, SocketProvider }
