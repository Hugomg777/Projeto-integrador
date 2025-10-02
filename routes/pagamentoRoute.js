const express = require('express');
const router = express.Router();

const PagamentoController = require('../controllers/pagamentoController'); 


router.post('/', PagamentoController.criarPagamento);
router.post('/webhook', PagamentoController.lidarComWebhook);
router.get('/:id', PagamentoController.obterStatusPagamento);
router.get('/publickey', PagamentoController.obterPublicKey);


module.exports = router;