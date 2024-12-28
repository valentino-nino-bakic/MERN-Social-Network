
import { useState, useEffect } from 'react';


const Chat = ({ socket, selectedFriend, handleSendMessage, handleReceiveMessage }) => {
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);

    return (
        <>
            {selectedFriend ? (
                messages.map(message => (
                    <p>{message.content}</p>
                ))
            ) : (
                <h1>you must select a friend from your friendlist first...</h1>
            )}
        </>
    )
}



export default Chat;
