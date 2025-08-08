const express = require('express');
const router = express.Router();
const EnderecoController = require('../controllers/enderecoController'); 

router.post('/criar', EnderecoController.create);
router.get('/listartodos', EnderecoController.findAll);
router.get('/buscar/:id', EnderecoController.findById);
router.put('/atualizar/:id', EnderecoController.update);
router.delete('/deletar/:id', EnderecoController.delete);

module.exports = router;