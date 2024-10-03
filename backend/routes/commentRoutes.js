const express = require('express');
const router = express.Router();
const CommentController = require('../controllers/commentController');


router.get('/:postId', CommentController.getComments);
router.post('/comments', CommentController.createComment);




module.exports = router;
