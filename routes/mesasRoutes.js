const express = require('express');
const router = express.Router();

const { authMiddleware } = require('../middleware/authMiddleware');

const { criarMesaController, listarTodasMesasController} = require('../controllers/mesaController');

router.post('/criarMesa', authMiddleware, criarMesaController);
router.get('/', authMiddleware, listarTodasMesasController);

module.exports = router;