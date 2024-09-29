const express = require('express');
const router = express.Router();
const PostController = require('../controllers/postController');


router.get('/posts', PostController.getAllPosts);
router.post('/posts', PostController.createPost);



module.exports = router;
