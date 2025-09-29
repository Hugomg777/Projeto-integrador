const express = require('express');
const router = express.Router();
const carrinhoController = require('../controllers/carrinhoController');
router.post('/', carrinhoController.createCarrinho);
router.get('/', carrinhoController.getAllCarrinhos);
router.get('/:id', carrinhoController.getCarrinhoById);
router.get('/cliente/:id_cliente', carrinhoController.getCarrinhoByClienteId);
router.put('/:id', carrinhoController.updateCarrinho);
router.delete('/:id', carrinhoController.deleteCarrinho);

module.exports = router;