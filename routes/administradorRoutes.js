const express = require('express');
const router = express.Router();
const administradorController = require('../controllers/administradorController');
router.post('/', administradorController.createAdministrador);
router.get('/', administradorController.getAllAdministradores);
router.get('/:id', administradorController.getAdministradorById);
router.put('/:id', administradorController.updateAdministrador);
router.delete('/:id', administradorController.deleteAdministrador);

module.exports = router;