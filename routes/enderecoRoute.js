const express = require('express');
const router = express.Router();
const EnderecoController = require('../controllers/enderecoController'); 

router.post('/', EnderecoController.create);

router.get('/', EnderecoController.findAll);

router.get('/:id', EnderecoController.findById);

router.put('/:id', EnderecoController.update);

router.delete('/:id', EnderecoController.delete);

module.exports = router;