const express = require('express');
const router = express.Router();
const carteiraController = require('../controllers/carteiraController');

router.post('/criar', carteiraController.criarCarteira);
router.get('/listartodos', carteiraController.listarCarteiras);
router.get('/buscar/:id', carteiraController.buscarCarteiraPorId);
router.put('/atualizar/:id', carteiraController.atualizarCarteira);
router.delete('/deletar/:id', carteiraController.deletarCarteira);

module.exports = router;