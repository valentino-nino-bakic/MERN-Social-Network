const express = require('express');
const router = express.Router();
const UserController = require('../controllers/userController');
const userAuth = require('../middlewares/userAuth');


router.post('/signup', UserController.signup);
router.post('/login', UserController.login);
router.delete('/delete/:id', userAuth, UserController.delete);
router.put('/modify/:id', userAuth, UserController.modify);



module.exports = router;
