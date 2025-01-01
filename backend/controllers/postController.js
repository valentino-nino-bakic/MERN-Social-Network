const Post = require('../models/postModel');
const User = require('../models/userModel');


const postController = {

    getAllPosts: async (req, res) => {
        try {
            const posts = await Post.find().populate('author', 'username profileImageUrl');
            return res.status(200).json({ posts: posts });
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: error.message });
        }
    },


    getPostsByUserId: async (req, res) => {
        const userId = req.params.userId;
        try {
            const user = await User.findById(userId);
            if (!user) {
                throw new Error('User not found');
            }
            const posts = await Post.find({ author: userId }).populate('author', 'username profileImageUrl');
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
