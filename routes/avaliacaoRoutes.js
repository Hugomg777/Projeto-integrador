const express = require('express');
const router = express.Router();
const avaliacaoController = require('../controllers/avaliacaoController'); 

const { validarDadosAvaliacao } = avaliacaoController; 

router.get('/produto/:id_produto', avaliacaoController.listarAvaliacoesPorProduto);
router.post('/', validarDadosAvaliacao, avaliacaoController.criarAvaliacaoProduto);
router.put('/:id_avaliacao', validarDadosAvaliacao, avaliacaoController.atualizarAvaliacao);
router.delete('/:id_avaliacao', avaliacaoController.deletarAvaliacao);

module.exports = router;