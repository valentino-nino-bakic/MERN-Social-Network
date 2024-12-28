
import { useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';




const Chat = ({ user, selectedFriend, socket, getMessages, sendMessage /* handleReceiveMessage */ }) => {
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);

    const handleSendMessage = e  => {
        e.preventDefault();
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
                <div className="container-fluid d-flex flex-column border shadow-sm rounded p-3">
                    <div className="d-flex">
                        <img src={selectedFriend.profileImageUrl} alt="profile" className="rounded-circle mx-2" style={{ height: '50px', width: '50px', objectFit: 'cover' }} />
                        <p className="fw-bold">{selectedFriend.username}</p>
                    </div>
                    <hr />
                    {messages.map((message, index) => (
                        <div key={index} className={`${message.senderId === jwtDecode(user).id ? 'align-self-end' : 'align-self-start'}`}>
                            <div className="d-flex">
                                {message.senderId === selectedFriend._id && <img src={selectedFriend.profileImageUrl} alt="profile" className="rounded-circle" style={{ height: '35px', width: '35px', objectFit: 'cover' }} />}
                                <p className={`message ${message.senderId === jwtDecode(user).id ? 'my-message' : 'friend-message'}`}>{message.content}</p>
                            </div>
                        </div>
                    ))}
                    <form onSubmit={handleSendMessage} className="message-input mt-5 container-fluid">
                        <div className="row">
                            <div className="col-md-10">
                                <input
                                    className="w-100 p-2 border rounded"
                                    type="text"
                                    value={message}
                                    onChange={e => setMessage(e.target.value)}
                                    placeholder="Type a message..."
                                />
                            </div>
                            <div className="col-md-2 d-flex align-items-center justify-content-end">
                               
                                <button type="submit" className="btn btn-primary w-100">Send</button>
                            </div>
                        </div>
                    </form>
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
