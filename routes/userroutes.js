const express = require('express');
const router = express.Router();
const userController = require('../controllers/usercontroller');

router.get('/', userController.getAllUsers);
router.post('/', userController.createUser);
router.put('/:id', userController.updateUser);
router.get('/:id', userController.getUserById);
router.delete('/:id', userController.deleteUserById);



module.exports = router;
