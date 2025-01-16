
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

import useAuth from '../hooks/useAuth';
import useSocket from '../hooks/useSocket';

import { formatDate, formatGroupedMessagesDate } from '../utils/formatDate';



const Chat = () => {
    const { username } = useParams();
    const navigate = useNavigate();

    const [selectedFriend, setSelectedFriend] = useState(null);
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState({});
    const [myID, setMyID] = useState(null);

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const { user, getUserByUsername } = useAuth();
    const { socket, getMessages, sendMessage } = useSocket();

    const handleSendMessage = e => {
        e.preventDefault();
        sendMessage(jwtDecode(user).id, selectedFriend._id, message);
        setMessage('');
        setMessages([...messages, { senderId: jwtDecode(user).id, content: message, createdAt: Date.now() }]);
    }


    useEffect(() => {
        setMyID(jwtDecode(user).id);
    }, [user]);



    useEffect(() => {
        const fetchUser = async () => {
            setLoading(true);
            setError(null);
            try {
                const data = await getUserByUsername(username);
                setSelectedFriend(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        }
        if (username) {
            fetchUser();
        } else {
            setSelectedFriend(null);
            setLoading(false);
        }
    }, [username, getUserByUsername]);


    useEffect(() => {
        const fetchMessages = async (socket, currentUserId, otherUserId) => {
            if (socket) {
                try {
                    const allMessages = await getMessages(socket, currentUserId, otherUserId);
                    console.log(allMessages);
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




    useEffect(() => {
        const receiveMessage = async (otherUserId, currentUserId) => {
            if (socket) {
                try {
                    socket.on('receivePrivateMessage', data => {
                        const { senderId, message, createdAt } = data;
                        console.log(`Received message from user ${senderId}:`, message);
                        if (senderId === selectedFriend._id) {
                            setMessages(prev => ([...prev, { senderId: senderId, content: message, createdAt: createdAt }]));
                        }
                    });
                } catch (error) {
                    console.log(error)
                }
            } else {
                console.log('Socket not initialized');
            }
        }

        if (selectedFriend && myID) {
            receiveMessage(selectedFriend._id, myID);
        }

        return () => {
            if (socket) {
                socket.off('receivePrivateMessage');
            }
        };

    }, [selectedFriend, myID, socket]);


    const handleGoToClickedImageProfile = e => {
        const username = e.target.getAttribute('data-user-username');
        navigate(`/home/user/${username}`);
    }


    // useEffect(() => {
    //     const interval = setInterval(() => {
    //         setMessages(prev => {
    //             return prev.map(message => ({
    //                 ...message,
    //                 createdAt: new Date(message.createdAt)
    //             }));
    //         });
    //     }, 1000);

    //     return () => clearInterval(interval);
    // }, []);


    // if (loading) {
    //     return <div>Loading...</div>
    // }

    if (error) {
        return <div>Error: {error}</div>
    }


    return (
        <>
            {selectedFriend ? (
                <div className="container-fluid d-flex flex-column border shadow-sm rounded px-3 overflow-auto bg-light" style={{ height: '75vh' }}>

                    <div className="d-flex position-sticky top-0 bg-white border-bottom py-2" style={{ margin: '0 -16px 30px -16px' }}>
                        <img
                            src={selectedFriend.profileImageUrl}
                            alt="profile" className="rounded-circle mx-2"
                            data-user-username={selectedFriend.username}
                            onClick={handleGoToClickedImageProfile}
                            style={{ height: '50px', width: '50px', objectFit: 'cover', cursor: 'pointer' }}
                        />
                        <p
                            className="fw-bold"
                            data-user-username={selectedFriend.username}
                            onClick={handleGoToClickedImageProfile}
                            style={{ cursor: 'pointer' }}
                        >
                            {selectedFriend.username}
                        </p>
                    </div>

                    {Object.keys(messages).map(date => (
                        <div className="d-flex flex-column" key={date}>
                            <p className="text-center" style={{ color: 'rgba(33, 37, 41, 0.33)' }}>{formatGroupedMessagesDate(date)}</p>
                            {messages[date].map((message, index) => (
                                <div key={index} className={`${message.senderId === jwtDecode(user).id ? 'align-self-end' : 'align-self-start'}`}>
                                    <small className="text-muted">{formatDate(message.createdAt)}</small>
                                    <div className="d-flex align-items-center">
                                        {message.senderId === selectedFriend._id && (
                                            <img
                                                src={selectedFriend.profileImageUrl}
                                                alt="profile"
                                                className="rounded-circle"
                                                style={{ height: '35px', width: '35px', objectFit: 'cover' }}
                                            />
                                        )}
                                        <p className={`message ${message.senderId === jwtDecode(user).id ? 'my-message' : 'friend-message'}`}>
                                            {message.content}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ))}

                    <form onSubmit={handleSendMessage} className="d-flex align-items-center position-sticky bottom-0 bg-white message-form">
                        <textarea
                            type="text"
                            value={message}
                            onChange={e => setMessage(e.target.value)}
                            placeholder="Type a message..."
                            className="form-control border-0"
                        >
                        </textarea>
                        <button type="submit" className="btn btn-primary ms-2 rounded-circle d-flex align-items-center justify-content-center" style={{ width: '40px', height: '40px' }}>
                            <i className="fa fa-paper-plane"></i>
                        </button>
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
