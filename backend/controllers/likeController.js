const Like = require('../models/likeModel');




const likeController = {

    getLikesByPostId: async (req, res) => {
        try {
            const likes = await Like.find({ postId: req.params.postId }).populate('author', 'username profileImageUrl');;
            return res.status(200).json({ likes });
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: error.message });
        }
    },

    likePost: async (req, res) => {
        const { postId, author } = req.body;
        try {
            const newLike = new Like({
                postId,
                author
            });
            await newLike.save();

            const populatedLike = await newLike.populate('author', 'username profileImageUrl');
            return res.status(201).json(populatedLike);
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: error.message });
        }
    }
}





module.exports = likeController;
