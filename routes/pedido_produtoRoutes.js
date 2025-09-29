const express = require('express');
const router = express.Router();
const pedidoProdutoController = require('../controllers/pedido_produtoController');

router.post('/', pedidoProdutoController.addItemAoPedido);
router.get('/pedido/:id_pedido', pedidoProdutoController.getProdutosDoPedido);
router.put('/:id', pedidoProdutoController.updateItemDoPedido);
router.delete('/:id', pedidoProdutoController.removerItemDoPedido);

module.exports = router;