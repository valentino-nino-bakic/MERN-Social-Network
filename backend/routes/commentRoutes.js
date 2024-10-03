const express = require('express');
const router = express.Router();
const CommentController = require('../controllers/commentController');


router.get('/comments', CommentController.getAllComments);




module.exports = router;
