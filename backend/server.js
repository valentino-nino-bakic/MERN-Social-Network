const express = require('express');
const http = require('http');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();
const PORT = process.env.PORT;
const DB_CONNECTION_STRING = process.env.DB_CONNECTION_STRING;

const userRouter = require('./routes/userRoutes');
const postRouter = require('./routes/postRoutes');
const commentRouter = require('./routes/commentRoutes');
const likeRouter = require('./routes/likeRoutes');


const SocketController = require('./controllers/socketController');



const server = http.createServer(app);
const { Server } = require('socket.io');
const io = new Server(server, {
    cors: {
        origin: '*',
        methods: ['GET', 'POST']
    }
})



const connectWithDB = async () => {
    try {
        await mongoose.connect(DB_CONNECTION_STRING);
        console.log('Successful connection with MongoDB');
    } catch (error) {
        console.log(error);
    }
}
connectWithDB();



app.use(express.json());
app.use(cors());
app.use('/uploads', express.static('uploads'));


app.use('/api', userRouter);
app.use('/api', postRouter);
app.use('/api', commentRouter);
app.use('/api', likeRouter);



io.on('connection', socket => {
    console.log(`New user connected: ${socket.id}`);
    socket.join(socket.handshake.query.userId);

    socket.on('sendFriendRequest', data => SocketController.sendFriendRequest(socket, data));
    socket.on('acceptFriendRequest', data => SocketController.acceptFriendRequest(socket, data));
    socket.on('declineFriendRequest', data => SocketController.declineFriendRequest(socket, data));
    socket.on('fetchFriendshipInfo', data => SocketController.fetchFriendshipInfo(socket, data));
    socket.on('fetchFriendRequests', data => SocketController.fetchFriendRequests(socket, data));
    socket.on('fetchFriends', data => SocketController.fetchFriends(socket, data));
    socket.on('sendPrivateMessage', data => SocketController.sendPrivateMessage(socket, data));
    socket.on('fetchMessages', data => SocketController.fetchPrivateMessages(socket, data));


    socket.on('disconnect', () => {
        console.log(`User disconnected ${socket.id}`);
    });
});



server.listen(PORT, () => {
    console.log(`Server up and running on port ${PORT}`);
});
