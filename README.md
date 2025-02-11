Sistema de Reserva de Mesas
Este é um sistema de reserva de mesas para restaurantes, desenvolvido em Node.js com Express e Bull para gerenciamento de filas. O sistema permite criar mesas, listar mesas disponíveis e reservar mesas, com o tempo de reserva sendo gerenciado automaticamente pelo Bull.

Funcionalidades
Criação de Mesas: Administradores podem criar mesas com número, capacidade e status.

Listagem de Mesas: Lista todas as mesas disponíveis para reserva.

Reserva de Mesas: Usuários podem reservar mesas para um horário específico.

Liberação Automática: Após o tempo de reserva expirar, a mesa é liberada automaticamente.

Tecnologias Utilizadas
Node.js: Ambiente de execução JavaScript.

Express: Framework para construção da API.

Bull: Biblioteca para gerenciamento de filas baseadas em Redis.

Redis: Armazenamento de filas e estado das reservas.

Joi: Validação de dados de entrada.

date-fns: Manipulação de datas.

Pré-requisitos
Antes de executar o projeto, certifique-se de ter instalado:

Node.js (v16 ou superior)

Redis (rodando localmente ou em um servidor)

npm ou yarn (gerenciador de pacotes)

