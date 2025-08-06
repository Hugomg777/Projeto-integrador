const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// Rota para criar um usuário
router.post('/create', userController.createUser);

// Rota para buscar todos os usuários
router.get('/', userController.getAllUsers);

// Rota para buscar um usuário por ID
router.get('/:id', userController.getUserById);

// Rota para atualizar um usuário por ID
router.put('/:id', userController.updateUser);

// Rota para deletar um usuário por ID
router.delete('/:id', userController.deleteUser);

module.exports = router;