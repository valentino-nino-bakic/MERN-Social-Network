
const bcrypt = require('bcrypt');
const User = require('../models/userModel');


const AdminController = {

    createUser: async (req, res) => {
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
                password: hashedPassword,
            }
            const newUser = new User(newUserData);

            await newUser.save();
            return res.status(201).json({ message: 'New user has been successfully created!' });

        } catch (error) {
            console.log(error);
            res.status(500).json({ message: error.message });
        }
    },



    editUser: async (req, res) => {
        try {
            const { username, role } = req.body;

            const usernameOccupied = await User.findOne({ username: username });
            if (usernameOccupied) {
                return res.status(400).json({ message: `Username ${usernameOccupied} already exists, try with different one...` });
            }

            const userId = req.params.id;
            const user = await User.findById(userId);

            user.username = username;
            user.role = role;

            await user.save();
            return res.status(200).json({ message: 'User has been successfully modified!' });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: error.message });
        }
    },



    deleteUser: async (req, res) => {
        try {
            await User.findByIdAndDelete(req.params.id);
            return res.status(200).json({ message: 'User has been successfully deleted!' });
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: error.message });
        }
    },
}




module.exports = AdminController;
