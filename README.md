# API de Gestão de Biblioteca (Library API)

API REST desenvolvida em Node.js para gerenciamento de uma biblioteca, incluindo controle de autores, livros, usuários e sistema de empréstimos com validação de estoque automática.

## Tecnologias Utilizadas

- **Node.js** (Ambiente de execução)
- **Express** (Framework Web)
- **PostgreSQL** (Banco de Dados Relacional)
- **Docker & Docker Compose** (Containerização do Banco)
- **PG (node-postgres)** (Driver de conexão)

## Funcionalidades

- **Autores**: CRUD completo.
- **Livros**: 
  - CRUD completo com relacionamento (Foreign Key) para Autores.
  - Controle de quantidade disponível.
- **Usuários**: 
  - Cadastro com validação de **E-mail Único**.
- **Empréstimos**:
  - Registro de empréstimos (Usuário + Livro).
  - **Lógica de Negócio**: Validação de estoque antes do empréstimo.
  - **Baixa Automática**: Atualiza a quantidade do livro ao confirmar o empréstimo.
  - Listagem com JOINs (trazendo nomes reais em vez de apenas IDs).

## Como Rodar o Projeto

### Pré-requisitos
- Node.js instalado.
- Docker e Docker Compose instalados.

### Passo a Passo

1. **Clone o repositório:**
```bash
git clone https://github.com/leonarrdodev/library-flow.git
cd library-flow
```
   Instale as dependências:
```
npm install
```
Configure as Variáveis de Ambiente:
Crie um arquivo .env na raiz do projeto e configure a conexão com o banco:

```
PORT=3000
DB_USER=postgres
DB_HOST=localhost
DB_NAME=library
DB_PASSWORD=docker
DB_PORT=5432
````
Suba o Banco de Dados (Docker):

```
docker compose up -d
```
Inicie o Servidor:

```
npm run dev
```

# ou
```
node src/index.js
```
O servidor rodará em http://localhost:3000.
## Rotas da API (Endpoints)

### Autores (/authors)
- GET / - Listar todos.
- POST / - Criar novo.
- PUT /:id - Atualizar.
- DELETE /:id - Deletar.

### Livros (/books)
- GET / - Listar todos (com nome do autor).
- POST / - Criar (requer autor_id).
- PUT /:id - Atualizar.
- DELETE /:id - Deletar.

### Usuários (/users)
- GET / - Listar todos.
- POST / - Criar (valida e-mail único).
- PUT /:id - Atualizar.
- DELETE /:id - Deletar.

### Empréstimos (/loans)
- GET / - Listar todos (com nomes de usuário e livro).
- POST / - Criar novo empréstimo (baixa estoque automaticamente).


Desenvolvido por Leonardo