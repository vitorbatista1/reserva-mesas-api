const express = require('express');
const router = express.Router();

const { criarUsuarioController } = require('../controllers/usuarioControllers');

router.post('/registrar', criarUsuarioController);

module.exports = router;