const express = require('express');
const router = express.Router();
const PostController = require('../controllers/postController');


router.get('/posts', PostController.getAllPosts);



module.exports = router;
