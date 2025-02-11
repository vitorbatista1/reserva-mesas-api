const express = require('express');
const router = express.Router();

const { authMiddleware } = require('../middleware/authMiddleware');

const { criarMesaController, listarTodasMesasController, reservarMesaController} = require('../controllers/mesaController');

router.post('/criarMesa', authMiddleware, criarMesaController);
router.get('/', authMiddleware, listarTodasMesasController);
router.get('/reservar/:id', authMiddleware, reservarMesaController);

module.exports = router;