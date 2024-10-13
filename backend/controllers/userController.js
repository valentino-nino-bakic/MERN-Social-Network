const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const SECRET_KEY = process.env.SECRET_KEY;
const User = require('../models/userModel');



const UserController = {

    signup: async (req, res) => {
        try {
            const { username, email, password } = req.body;
            const usernameOccupied = await User.findOne({ username: username });
            if (usernameOccupied) {
                return res.status(400).json({ message: `Username ${usernameOccupied} already exists, try with different one...` });
            }

            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(password, salt);

            const newUserData = {
                username: username,
                email: email,
                password: hashedPassword
            }
            const newUser = new User(newUserData);

            await newUser.save();
            return res.status(201).json({ message: 'You have been successfully registered!\nYou can now proceed to log in to your account!' });

        } catch (error) {
            console.log(error);
            res.status(500).json({ message: error.message });
        }
    },



    login: async (req, res) => {
        try {
            const { usernameOrEmail, password } = req.body;
            const user = await User.findOne({ $or: [{ username: usernameOrEmail }, { email: usernameOrEmail }] });
            if (!user) {
                return res.status(401).json({ message: 'Invalid username/email' });
            }

            const validPassword = await bcrypt.compare(password, user.password);
            if (!validPassword) {
                return res.status(401).json({ message: 'Invalid password' });
            }

            if (user.role === 'admin') {
                const token = jwt.sign({ id: user._id, username: user.username, email: user.email, role: 'admin' }, SECRET_KEY, { expiresIn: '1h' });
                res.status(200).json({ message: 'You have been successfully logged in!', token: token });
            } else {
                const token = jwt.sign({ id: user._id, username: user.username, email: user.email, role: 'user', profileImageUrl: user.profileImageUrl }, SECRET_KEY, { expiresIn: '1h' });
                res.status(200).json({ message: 'You have been successfully logged in!', token: token });
            }


        } catch (error) {
            console.log(error);
            res.status(500).json({ message: error.message });
        }
    },



    delete: async (req, res) => {
        try {
            const password = req.body.password;

            const validPassword = await bcrypt.compare(password, req.user.password);
            if (!validPassword) {
                return res.status(401).json({ message: 'Invalid password' });
            }

            await User.findByIdAndDelete(req.user._id);
            return res.status(200).json({ message: 'You have successfully deleted your account!' });

        } catch (error) {
            console.log(error);
            res.status(500).json({ message: error.message });
        }
    },



    modify: async (req, res) => {
        try {
            const { newUsername, newPassword, currentPassword } = req.body;

            const validPassword = await bcrypt.compare(currentPassword, req.user.password);
            if (!validPassword) {
                return res.status(401).json({ message: 'Invalid password' });
            }

            const modifiedUserData = {
                username: newUsername || req.user.username,
            }
            if (newPassword) {
                const salt = await bcrypt.genSalt(10);
                modifiedUserData.password = await bcrypt.hash(newPassword, salt);
            }

            await User.findByIdAndUpdate(req.user._id, modifiedUserData, { new: true });
            return res.status(201).json({ message: 'Your account has been modified!\nYou can now proceed to log in with your new credentials!' });

        } catch (error) {
            console.log(error);
            res.status(500).json({ message: error.message });
        }
    },



    uploadProfileImage: async (req, res) => {
        try {
            const userId = req.user._id;
            const user = await User.findById(userId);

            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }

            user.profileImageUrl = `http://localhost:8080/uploads/${req.file.filename}`;
            await user.save();

            return res.status(200).json({ message: 'Your profile image has been successfully uploaded!', profileImageUrl: user.profileImageUrl });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },



    searchUsers: async (req, res) => {
        const { query } = req.query;
        try {
            const users = await User.find({ username: { $regex: query, $options: 'i' } });
            res.status(200).json({ users: users });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

}





module.exports = UserController;
