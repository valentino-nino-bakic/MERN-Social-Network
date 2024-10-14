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

    socket.on('private_message', ({ message, toUserId }) => {
        console.log(`Message: ${message}, To: ${toUserId}`);

        io.to(toUserId).emit('receive_message', {
            message: message,
            fromUserId: socket.id
        });
    });

    socket.on('disconnect', () => {
        console.log(`User disconnected ${socket.id}`);
    });
});



server.listen(PORT, () => {
    console.log(`Server up and running on port ${PORT}`);
});
