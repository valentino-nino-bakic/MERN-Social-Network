const express = require('express');
const app = express();
const mongoose = require('mongoose');
require('dotenv').config();
const PORT = process.env.PORT;
const DB_CONNECTION_STRING = process.env.DB_CONNECTION_STRING;


const connectWithDB = async () => {
    try {
        await mongoose.connect(DB_CONNECTION_STRING);
        console.log('Successful connection with MongoDB');
    } catch (error) {
        console.log(error);
    }
}
connectWithDB();



app.listen(PORT, () => {
    console.log(`Server up and running on port ${PORT}`);
});
