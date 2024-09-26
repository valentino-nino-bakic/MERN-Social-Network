const jwt = require('jsonwebtoken');
const SECRET_KEY = process.env.SECRET_KEY;
const User = require('../models/userModel');


const userAuth = async (req, res, next) => {
    try {
        const authorizationHeader = req.headers.authorization;
        if (!authorizationHeader || !authorizationHeader.startsWith('Bearer ')) {
            return res.status(401).json({ message: 'Authentication failed' });
        }
        const token = authorizationHeader.split(' ')[1];
        const validToken = jwt.verify(token, SECRET_KEY);

        const user = await User.findById(validToken.id);
        if (!user) {
            return res.status(401).json({ message: 'You are not authorized to complete the action' });
        }

        req.user = user;
        next();
    } catch (error) {
        return res.status(401).json({ message: 'Invalid token' });
    }
}



module.exports = userAuth;
