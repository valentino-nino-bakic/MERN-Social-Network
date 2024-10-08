const Comment = require('../models/commentModel');



const commentController = {

    getCommentsByPostId: async (req, res) => {
        try {
            const comments = await Comment.find({ postId: req.params.postId }).populate('author', 'username profileImageUrl');;
            return res.status(200).json({ comments });
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: error.message });
        }
    },

    createComment: async (req, res) => {
        const { postId, author, content } = req.body;
        try {
            const newComment = new Comment({
                postId,
                author,
                content
            });
            await newComment.save();

            const populatedComment = await newComment.populate('author', 'username profileImageUrl');
            return res.status(201).json(populatedComment);
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: error.message });
        }
    }
}





module.exports = commentController;
