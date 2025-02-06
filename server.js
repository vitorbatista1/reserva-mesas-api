
const express = require('express');

const app = express();
app.use(express.json()); 

const tarefaRoutes = require('./routes/reservaRoutes');
const usuarioRoutes = require('./routes/usuarioRoutes')
const loginRoutes = require('./routes/loginRoutes')
const mesaRoutes = require('./routes/mesasRoutes')

const PORT = process.env.PORT || 3000;

app.use('/api/tarefas', tarefaRoutes);
app.use('/api/usuarios', usuarioRoutes);
app.use('/api/login', loginRoutes);
app.use('/api/mesas', mesaRoutes);

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});