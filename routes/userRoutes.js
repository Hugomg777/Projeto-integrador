const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
router.post('/cadastrar', userController.registerUser);

router.post('/login', userController.loginUser);

router.get('/', userController.getAllUsers);

module.exports = router;