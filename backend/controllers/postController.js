const Post = require('../models/postModel');



const postController = {

    getAllPosts: async (req, res) => {
        try {
            const posts = await Post.find();
            return res.status(200).json({ posts: posts });
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: error.message });
        }
    },
}





module.exports = postController;
