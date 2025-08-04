const express = require('express');
const router = express.Router();
const carteiraController = require('../controllers/carteiraController');

router.post('/', carteiraController.criarCarteira);
router.get('/', carteiraController.listarCarteiras);
router.get('/:id', carteiraController.buscarCarteiraPorId);
router.put('/:id', carteiraController.atualizarCarteira);
router.delete('/:id', carteiraController.deletarCarteira);

module.exports = router;