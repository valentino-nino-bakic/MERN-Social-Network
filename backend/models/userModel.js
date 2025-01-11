const mongoose = require('mongoose');

const User = mongoose.model('User', {
    username: { type: String, required: true, unique: true, minlength: 4, maxlength: 15 },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true, minlength: 8 },
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user'
    },
    profileImageUrl: { type: String, default: '/assets/images/user_avatar.png' },
    friends: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    }],
    friendRequests: [{
        senderId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
        },
        status: {
            type: String,
            enum: ['pending', 'accepted', 'declined'],
            default: 'pending',
        },
        createdAt: {
            type: Date,
            default: Date.now,
        }
    }]
});



module.exports = User;
