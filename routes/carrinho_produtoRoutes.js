const express = require('express');
const router = express.Router();
const carrinhoProdutoController = require('../controllers/carrinho_produtoController');
router.post('/', carrinhoProdutoController.addItemAoCarrinho);
router.get('/carrinho/:id_carrinho', carrinhoProdutoController.getProdutosDoCarrinho);
router.put('/:id', carrinhoProdutoController.updateQuantidadeItem);
router.delete('/:id', carrinhoProdutoController.removerItemDoCarrinho);

module.exports = router;