// routes/tarefaRoutes.js

const express = require('express');
const router = express.Router();
const tarefaController = require('../controllers/reservaControllers');
// Rotas para operações CRUD de tarefas
router.get('/tarefas', tarefaController.listarTarefas);
router.post('/tarefas', tarefaController.criarTarefa);
router.put('/tarefas/:id', tarefaController.atualizarTarefa);
router.delete('/tarefas/:id', tarefaController.excluirTarefa);
module.exports = router;