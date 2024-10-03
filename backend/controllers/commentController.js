const Comment = require('../models/commentModel');



const commentController = {

    getComments: async (req, res) => {
        try {
            const comments = await Comment.find({ postId: req.params.postId });
            return res.status(200).json({ comments: comments });
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: error.message });
        }
    },

    createComment: async (req, res) => {
        try {
            const newComment = new Comment(req.body);
            await newComment.save();
            return res.status(201).json({ message: 'Your comment has been successfully created!' });
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: error.message });
        }
    }
}





module.exports = commentController;
