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


    createPost: async (req, res) => {
        const { title, content, author, createdAt } = req.body;
        try {
            const newPostData = {
                title,
                content,
                author,
                createdAt
            }
            const newPost = new Post(newPostData);
            await newPost.save();
            return res.status(201).json({ message: 'Your post has been successfully created', post: newPost });
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: error.message });
        }
    },
}





module.exports = postController;
