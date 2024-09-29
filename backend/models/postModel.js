const mongoose = require('mongoose');

const Post = mongoose.model('Post', {
    title: { type: String, required: true, minlength: 5, maxlength: 40 },
    content: { type: String, required: true, minlength: 10 },
    author: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    createdAt: { type: Date, default: Date.now }
});



module.exports = Post;
