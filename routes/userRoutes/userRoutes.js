const express = require('express');
const router = express.Router();
const userController = require('../../controllers/userControllers/userController');

router.post('/cadastrar', userController.registerUser);
router.post('/login', userController.loginUser);

module.exports = router;
