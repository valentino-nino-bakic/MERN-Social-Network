const express = require('express');
const router = express.Router();
const CommentController = require('../controllers/commentController');
const userAuth = require('../middlewares/userAuth');


router.get('/comments/:postId', CommentController.getCommentsByPostId);
router.post('/comments', userAuth, CommentController.createComment);




module.exports = router;
