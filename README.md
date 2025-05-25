# Sistema de Gerenciamento de Reservas de Salas de Aula

Este projeto foi desenvolvido para facilitar o controle e gerenciamento de reservas de salas de aula, oferecendo um sistema completo para cadastro de usuários, definição dos tipos e características das salas, controle dos status das reservas e agendamento das mesmas. O sistema é construído utilizando Node.js e PostgreSQL, e possui uma arquitetura modular que separa responsabilidades em camadas de modelos, serviços e controladores.



## Visão Geral do Projeto

O sistema gerencia cinco entidades principais, cada uma representada por uma tabela no banco de dados:

- **type_classroom**: Define os tipos de salas disponíveis, como "Laboratório", "Sala Teórica", "Auditório", etc.
- **classroom**: Cadastro das salas, suas características (nome, capacidade, localização) e associação ao tipo da sala.
- **users**: Usuários do sistema que podem realizar reservas, contendo dados como nome, email e senha (armazenada de forma segura).
- **status_reservation**: Estados possíveis para uma reserva, por exemplo: "Pendente", "Confirmada", "Cancelada".
- **reservation**: Registros das reservas feitas, vinculando usuários, salas, horários e o status atual da reserva.



## Tecnologias Utilizadas

- Node.js (v18+)
- PostgreSQL (v13+)
- npm (Gerenciador de pacotes)
- Bibliotecas adicionais para conexão, validação e segurança



## Estrutura das Tabelas

| Tabela             | Descrição                                                                                  |
|--------------------|--------------------------------------------------------------------------------------------|
| `type_classroom`    | Tipos de salas (ex: Laboratório, Auditório)                                                |
| `classroom`        | Salas cadastradas (nome, capacidade, localização, tipo da sala)                            |
| `users`            | Usuários do sistema (nome, email, senha criptografada)                                    |
| `status_reservation` | Status possíveis para reservas (ex: Pendente, Confirmada, Cancelada)                      |
| `reservation`      | Registros de reservas com usuário, sala, data, horário e status                           |



## Instalação e Configuração

1. Clone o repositório:

   ```bash
   git clone https://github.com/carolmpaz/projeto-agendamento-salas.git
   cd projeto-agendamento-salas
 

2. Instale as dependências:

   ```bash
   npm install
   ```

3. Configure as variáveis de ambiente:

   Renomeie o arquivo `.env.example` para `.env` e preencha:

   ```
   DB_HOST=localhost
   DB_PORT=sua_porta
   DB_NAME=seu_banco
   DB_USER=seu_usuario
   DB_PASSWORD=sua_senha
   PORT=3000
   ```

4. Crie o banco de dados no PostgreSQL com o nome configurado.

5. Execute as migrações para criar as tabelas:

   ```bash
   npm run migration
   ```



## Funcionalidades Principais

* Gerenciamento de tipos de sala (adicionar, editar, excluir)
* Cadastro e edição das salas com atributos detalhados
* Cadastro de usuários com autenticação
* Controle dos status das reservas para fluxo de aprovação/cancelamento
* Criação, consulta, atualização e exclusão de reservas com validação de horários para evitar conflitos



## Endpoints Disponíveis

| Recurso                  | Métodos                | Descrição Resumida                              |
| ------------------------ | ---------------------- | ----------------------------------------------- |
| **/type\_classroom**     | GET, POST, PUT, DELETE | Gerenciar tipos de salas                        |
| **/classroom**           | GET, POST, PUT, DELETE | Gerenciar cadastro de salas                     |
| **/users**               | GET, POST, PUT, DELETE | Gerenciar usuários                              |
| **/status\_reservation** | GET, POST, PUT, DELETE | Gerenciar status das reservas                   |
| **/reservation**         | GET, POST, PUT, DELETE | Gerenciar reservas (agendar, alterar, cancelar) |




## Estrutura do Banco de Dados

O banco é composto por cinco tabelas principais:

### type_classroom

| Coluna              | Tipo         | Descrição                      |
|---------------------|--------------|--------------------------------|
| id_type_classroom   | SERIAL (PK)  | Identificador do tipo de sala |
| descricao           | VARCHAR(50)  | Nome do tipo (ex: Laboratório) |


### classroom

| Coluna            | Tipo         | Descrição                            |
|-------------------|--------------|--------------------------------------|
| id_classroom      | SERIAL (PK)  | Identificador da sala                |
| nome              | VARCHAR(100) | Nome da sala                         |
| capacidade        | INT          | Quantidade de pessoas comportadas    |
| localizacao       | VARCHAR(100) | Local da sala no prédio              |
| id_type_classroom | INT (FK)     | Tipo da sala (referencia type_classroom) |


### users

| Coluna    | Tipo         | Descrição                      |
|-----------|--------------|--------------------------------|
| id_users  | SERIAL (PK)  | ID do usuário                  |
| nome      | VARCHAR(100) | Nome completo                  |
| email     | VARCHAR(100) | E-mail do usuário (único)      |
| senha     | VARCHAR(255) | Senha criptografada            |


### status_reservation

| Coluna      | Tipo         | Descrição                             |
|-------------|--------------|---------------------------------------|
| id_status   | SERIAL (PK)  | Identificador do status               |
| descricao   | VARCHAR(50)  | Estado (ex: Pendente, Confirmado)     |


### reservation

| Coluna           | Tipo        | Descrição                                        |
|------------------|-------------|--------------------------------------------------|
| id_reservation   | SERIAL (PK) | Identificador da reserva                         |
| id_users         | INT (FK)    | Usuário que realizou a reserva                   |
| id_classroom     | INT (FK)    | Sala reservada                                   |
| data_reservation | DATE        | Data do agendamento                              |
| hora_inicio      | TIME        | Hora inicial                                     |
| hora_fim         | TIME        | Hora final                                       |
| id_status        | INT (FK)    | Status da reserva (Pendente, Confirmada, etc.)   |



## Endpoints da API

Abaixo estão listados os principais endpoints disponíveis organizados por recurso:

| Método | Rota                         | Ação                              |
|--------|------------------------------|-----------------------------------|
| GET    | `/type_classrooms`           | Listar todos os tipos de sala     |
| POST   | `/type_classrooms`           | Criar novo tipo de sala           |
| PUT    | `/type_classrooms/:id`       | Atualizar tipo de sala existente  |
| DELETE | `/type_classrooms/:id`       | Excluir tipo de sala              |
| GET    | `/classrooms`                | Listar todas as salas             |
| POST   | `/classrooms`                | Criar nova sala                   |
| PUT    | `/classrooms/:id`            | Atualizar sala existente          |
| DELETE | `/classrooms/:id`            | Excluir sala                      |
| GET    | `/users`                     | Listar todos os usuários          |
| POST   | `/users`                     | Criar novo usuário                |
| PUT    | `/users/:id`                 | Atualizar usuário existente       |
| DELETE | `/users/:id`                 | Excluir usuário                   |
| GET    | `/status_reservations`       | Listar todos os status            |
| POST   | `/status_reservations`       | Criar novo status de reserva      |
| PUT    | `/status_reservations/:id`   | Atualizar status existente        |
| DELETE | `/status_reservations/:id`   | Excluir status                    |
| GET    | `/reservations`              | Listar todas as reservas          |
| POST   | `/reservations`              | Criar nova reserva                |
| PUT    | `/reservations/:id`          | Atualizar reserva existente       |
| DELETE | `/reservations/:id`          | Excluir reserva                   |




## Métodos HTTP utilizados

- **GET** → Buscar dados (ex: listar salas)
- **POST** → Enviar dados para criação (ex: cadastrar nova reserva)
- **PUT** → Atualizar registros existentes (ex: editar status da reserva)
- **DELETE** → Excluir dados (ex: deletar reserva)

## Comandos Úteis

* `npm start` : Inicia o servidor
* `npm run dev` : Inicia o servidor em modo desenvolvimento com auto reload
* `npm run migration` : Executa a criação das tabelas e dados iniciais



