const express = require('express');
const router = express.Router();
const artistaController = require('../controllers/artistaController');

router.get('/', artistaController.getAllArtistas);
router.post('/', artistaController.createArtista);

module.exports = router;