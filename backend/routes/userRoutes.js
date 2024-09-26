const express = require('express');
const router = express.Router();
const UserController = require('../controllers/userController');


router.post('/signup', UserController.signup);
router.post('/login', UserController.login);
router.delete('/delete/:id', UserController.delete);
router.put('/modify/:id', UserController.modify);



module.exports = router;
