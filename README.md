
# Sistema de Reserva de Mesas

Este é um sistema de reserva de mesas para restaurantes, desenvolvido em Node.js com Express e Bull para gerenciamento de filas. O sistema permite criar mesas, listar mesas disponíveis e reservar mesas, com o tempo de reserva sendo gerenciado automaticamente pelo Bull.

## Funcionalidades

- **Criação de Mesas**: Administradores podem criar mesas com número, capacidade e status.
- **Listagem de Mesas**: Lista todas as mesas disponíveis para reserva.
- **Reserva de Mesas**: Usuários podem reservar mesas para um horário específico.
- **Liberação Automática**: Após o tempo de reserva expirar, a mesa é liberada automaticamente.

## Tecnologias Utilizadas

- **Node.js**: Ambiente de execução JavaScript.
- **Express**: Framework para construção da API.
- **Bull**: Biblioteca para gerenciamento de filas baseadas em Redis.
- **Redis**: Armazenamento de filas e estado das reservas.
- **Joi**: Validação de dados de entrada.
- **date-fns**: Manipulação de datas.

## Pré-requisitos

Antes de executar o projeto, certifique-se de ter instalado:

- **Node.js** (v16 ou superior)
- **Redis** (rodando localmente ou em um servidor)
- **npm** ou **yarn** (gerenciador de pacotes)

## Instalação

1. Clone este repositório:

   ```bash
   git clone https://github.com/seu-usuario/sistema-reserva-mesas.git
   ```

2. Acesse o diretório do projeto:

   ```bash
   cd sistema-reserva-mesas
   ```

3. Instale as dependências:

   ```bash
   npm install
   ```

   ou, se estiver usando **yarn**:

   ```bash
   yarn install
   ```

4. Certifique-se de que o **Redis** esteja em execução localmente ou em um servidor.

## Configuração do Redis

Se você está rodando o Redis localmente, basta ter o Redis instalado e em execução. Caso esteja utilizando um servidor remoto, atualize a URL de conexão com o Redis no código conforme necessário.

## Execução

1. Para rodar a aplicação:

   ```bash
   npm start
   ```

   ou, se estiver usando **yarn**:

   ```bash
   yarn start
   ```

2. A API estará disponível em `http://localhost:3000` (ou outra porta configurada).


## Licença

Este projeto está licenciado sob a [MIT License](LICENSE).
