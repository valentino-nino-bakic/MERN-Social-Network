const Comment = require('../models/commentModel');



const commentController = {

    getComments: async (req, res) => {
        try {
            const comments = await Comment.find({ postId: req.params.postId }).populate('author', 'username profileImageUrl');;
            return res.status(200).json({ comments });
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: error.message });
        }
    },

    createComment: async (req, res) => {
        try {
            const newComment = new Comment(req.body);
            await newComment.save();
            return res.status(201).json({ message: 'Your comment has been successfully created!', comment: newComment });
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: error.message });
        }
    }
}





module.exports = commentController;
