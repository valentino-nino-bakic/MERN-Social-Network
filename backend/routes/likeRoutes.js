const express = require('express');
const router = express.Router();
const LikeController = require('../controllers/likeController');
const userAuth = require('../middlewares/userAuth');


router.get('/likes/:postId', LikeController.getLikesByPostId);
router.post('/likes', userAuth, LikeController.likePost);




module.exports = router;
