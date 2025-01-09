const express = require('express');
const router = express.Router();
const AdminController = require('../controllers/adminController');


router.get('/admin/users/:id', AdminController.getUser);
router.get('/admin/users', AdminController.getUsers);
router.post('/admin/users', AdminController.createUser);
router.put('/admin/users/:id', AdminController.editUser);
router.delete('/admin/users/:id', AdminController.deleteUser);


module.exports = router;
