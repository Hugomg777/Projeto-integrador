const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// Rota para cadastrar um novo usuário (POST)
router.post('/cadastrar', userController.registerUser);

// Rota para fazer login (POST)
router.post('/login', userController.loginUser);

// ✅ ROTA PARA LISTAR TODOS OS USUÁRIOS (GET)
// Esta linha define que um GET para /api/users deve chamar a função getAllUsers.
router.get('/', userController.getAllUsers);

module.exports = router;