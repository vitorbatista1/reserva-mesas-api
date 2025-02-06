// Controlador para lidar com operações relacionadas às tarefas

// Array simulando uma lista de tarefas
let tarefas = [];

// Função para listar tarefas
const listarTarefas = (req, res) => {
  res.json(tarefas); // Retorna a lista de tarefas como JSON
};

// Função para criar uma nova tarefa
const criarTarefa = (req, res) => {
  const { usuario_id, mesa_id, data_reserva, status } = req.body; 
  
};

// Função para atualizar uma tarefa existente
const atualizarTarefa = (req, res) => {
  const { id } = req.params; // Obtém o ID da tarefa a ser atualizada dos parâmetros da URL
  const { descricao } = req.body; // Obtém a nova descrição da tarefa do corpo da requisição
  console.log(descricao)
  const index = tarefas.findIndex(tarefa => tarefa.id === parseInt(id)); // Encontra o índice da tarefa na lista de tarefas
  if (index !== -1) { // Verifica se a tarefa foi encontrada
    tarefas[index].descricao = descricao; // Atualiza a descrição da tarefa
    res.json(tarefas[index]); // Retorna a tarefa atualizada como JSON
  } else {
    res.status(404).json({ mensagem: 'Tarefa não encontrada' }); // Retorna um erro 404 se a tarefa não foi encontrada
  }
};

// Função para excluir uma tarefa
const excluirTarefa = (req, res) => {
  const { id } = req.params; // Obtém o ID da tarefa a ser excluída dos parâmetros da URL
  const index = tarefas.findIndex(tarefa => tarefa.id === parseInt(id)); // Encontra o índice da tarefa na lista de tarefas
  if (index !== -1) { // Verifica se a tarefa foi encontrada
    tarefas.splice(index, 1); // Remove a tarefa da lista de tarefas
    res.json({ mensagem: 'Tarefa excluída com sucesso' }); // Retorna uma mensagem de sucesso
  } else {
    res.status(404).json({ mensagem: 'Tarefa não encontrada' }); // Retorna um erro 404 se a tarefa não foi encontrada
  }
};

// Exportando os controladores para serem utilizados em outros arquivos
module.exports = { listarTarefas, criarTarefa, atualizarTarefa, excluirTarefa };