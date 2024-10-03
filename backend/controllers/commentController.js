const Comment = require('../models/commentModel');



const commentController = {

    getAllComments: async (req, res) => {
        try {
            const comments = await Comment.find().populate('author', 'username profileImageUrl');
            return res.status(200).json({ comments: comments });
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: error.message });
        }
    },
}





module.exports = commentController;
