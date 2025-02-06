const express = require('express');
const router = express.Router();

const { criarUsuarioController, buscarTodosUsuarios, buscarUsuario } = require('../controllers/usuarioControllers');


router.post('/registrar', criarUsuarioController);
router.get('/:id', buscarUsuario)
router.get('/allUsuarios', buscarTodosUsuarios);

module.exports = router;