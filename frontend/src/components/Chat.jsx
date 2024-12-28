
import { useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';




const Chat = ({ user, selectedFriend, socket, getMessages, sendMessage /* handleReceiveMessage */ }) => {
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);

    const handleSendMessage = () => {
        sendMessage(jwtDecode(user).id, selectedFriend._id, message);
        setMessage('');
        setMessages([...messages, { senderId: jwtDecode(user).id, content: message }]);
    }

    /*  const handleReceiveMessage = () => {
         receiveMessage(socket);
     }
  */

    useEffect(() => {
        const fetchMessages = async (socket, currentUserId, otherUserId) => {
            if (socket) {
                try {
                    const allMessages = await getMessages(socket, currentUserId, otherUserId);
                    setMessages(allMessages);
                } catch (error) {
                    console.log('Error fetching messages:', error);
                }
            } else {
                console.log('Socket not initialized');
            }
        }
        if (selectedFriend) {
            fetchMessages(socket, jwtDecode(user).id, selectedFriend._id);
        }
    }, [getMessages, user, socket, selectedFriend]);

    return (
        <>
            {selectedFriend ? (
                <div className="container-fluid d-flex flex-column">
                    {messages.map((message, index) => (
                        <div key={index} className={`message ${message.senderId === jwtDecode(user).id ? 'align-self-end' : 'align-self-start'}`}>
                            <p className="message-sender">{message.senderId === jwtDecode(user).id ? 'You' : selectedFriend.username}</p>
                            <p className="message-content">{message.content}</p>
                        </div>
                    ))}
                    <div className="message-input">
                        <input
                            type="text"
                            value={message}
                            onChange={e => setMessage(e.target.value)}
                            placeholder="Type a message..."
                        />
                        <button onClick={handleSendMessage}>Send</button>
                    </div>
                </div>
            ) : (
                <div className="container">
                    <div className="row">
                        <div className="col-md-8 offset-md-2">
                            <h1 className="text-center">You must select a friend from your friendlist first...</h1>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}



export default Chat;
