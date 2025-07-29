const express = require('express');
const router = express.Router();

const productController = require('../controllers/productController');

// Rota para criar um novo produto
router.post('/', productController.createProduto);

// Rota para obter todos os produtos
router.get('/', productController.getAllProdutos);

// Rota para obter um produto específico por ID
router.get('/:id', productController.getProdutoById);

// Rota para atualizar um produto por ID
router.put('/:id', productController.updateProduto);

// Rota para deletar um produto por ID
router.delete('/:id', productController.deleteProduto);

module.exports = router;