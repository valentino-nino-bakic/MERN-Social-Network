const mongoose = require('mongoose');

const Comment = mongoose.model('Comment', {
    postId: { type: mongoose.Schema.Types.ObjectId, ref: 'Post', required: true },
    author: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    content: { type: String, required: true, minlength: 1, maxlength: 500 },
    createdAt: { type: Date, default: Date.now }
});



module.exports = Comment;
