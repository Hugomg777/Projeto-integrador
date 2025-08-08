const express = require('express');
const router = express.Router();
const artistaController = require('../controllers/artistaController');

router.post('/criar', artistaController.createArtista);
router.get('/listartodos', artistaController.getAllArtistas);
router.get('/buscar/:id', artistaController.getArtistaById);
router.put('/atualizar/:id', artistaController.updateArtista);
router.delete('/deletar/:id', artistaController.deleteArtista);

module.exports = router;