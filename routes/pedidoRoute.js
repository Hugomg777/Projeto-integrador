const express = require('express');
const router = express.Router();
const pedidoController = require('../controllers/pedidoController');

router.post('/criar', pedidoController.criarPedido);
router.get('/listartodos', pedidoController.listarPedidos);
router.get('/buscar/:id', pedidoController.buscarPedidoPorId);
router.put('/atualizar/:id', pedidoController.atualizarPedido);
router.delete('/deletar/:id', pedidoController.deletarPedido);

module.exports = router;