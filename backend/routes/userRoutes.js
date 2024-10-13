const express = require('express');
const router = express.Router();
const UserController = require('../controllers/userController');
const userAuth = require('../middlewares/userAuth');
const upload = require('../middlewares/multer');


router.get('/search-results', UserController.searchUsers);
router.post('/signup', UserController.signup);
router.post('/login', UserController.login);
router.post('/upload-profile-image', userAuth, upload.single('profile-image'), UserController.uploadProfileImage);
router.delete('/delete/:id', userAuth, UserController.delete);
router.put('/modify/:id', userAuth, UserController.modify);



module.exports = router;
