const express = require('express');
const router = express.Router();
const PostController = require('../controllers/postController');
const userAuth = require('../middlewares/userAuth');



router.get('/posts', PostController.getAllPosts);
router.post('/posts', userAuth, PostController.createPost);



module.exports = router;
