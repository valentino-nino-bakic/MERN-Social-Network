
import useSocket from '../hooks/useSocket';


const Chat = ({ socket, selectedFriend, handleSendMessage, handleReceiveMessage }) => {
    const { sendMessage, receiveMessage } = useSocket();

    return (
        <>
           <h1>Chat</h1>
        </>
    )
}



export default Chat;
