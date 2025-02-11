const express = require('express');
const router = express.Router();

const { criarUsuarioController, loginController } = require('../controllers/usuarioControllers');
const verificaCorpo = require('../middleware/verificarCorpoRequisicao')

router.post('/register', verificaCorpo, criarUsuarioController);
router.post('/login', loginController);

module.exports = router;