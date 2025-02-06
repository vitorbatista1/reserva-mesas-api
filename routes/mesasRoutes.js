const express = require('express');
const router = express.Router();

const { authMiddleware } = require('../middleware/authMiddleware');

const { criarMesaController } = require('../controllers/mesaController');

router.post('/criarMesa', authMiddleware, criarMesaController);

module.exports = router;