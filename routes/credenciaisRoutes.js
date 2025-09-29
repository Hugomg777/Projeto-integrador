const express = require('express');
const router = express.Router();
const credenciaisController = require('../controllers/credenciaisController');

router.post('/login', credenciaisController.login);
router.post('/', credenciaisController.createCredencial);
router.get('/', credenciaisController.getAllCredenciais);
router.put('/:id', credenciaisController.updateCredencial);
router.delete('/:id', credenciaisController.deleteCredencial);

module.exports = router;