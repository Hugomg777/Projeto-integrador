const express = require('express');
const router = express.Router();

const productController = require('../controllers/productController');

router.post('/criar', productController.createProduto);
router.get('/todos', productController.getAllProdutos);
router.get('/buscar/:id', productController.getProdutoById);
router.put('/atualizar/:id', productController.updateProduto);
router.delete('/deletar/:id', productController.deleteProduto);

module.exports = router;