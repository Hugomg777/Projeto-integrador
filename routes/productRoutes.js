const express = require('express');
const router = express.Router();

const productController = require('../controllers/productController');

router.post('/', productController.createProduto);
router.get('/', productController.getAllProdutos);
router.get('/:id', productController.getProdutoById);
router.put('/:id', productController.updateProduto);
router.delete('/:id', productController.deleteProduto);

module.exports = router;