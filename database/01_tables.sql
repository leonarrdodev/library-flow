CREATE TABLE IF NOT EXISTS autores (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    nacionalidade VARCHAR(100)
);  

CREATE TABLE IF NOT EXISTS livros (
    id SERIAL PRIMARY KEY,
    titulo VARCHAR(100) NOT NULL,
    autor_id INTEGER NOT NULL REFERENCES autores(id),
    quantidade_disponivel INTEGER DEFAULT 0 CHECK (quantidade_disponivel >= 0)
);

CREATE TABLE IF NOT EXISTS usuarios (
    id SERIAL PRIMARY KEY, 
    nome VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE
);

CREATE TABLE IF NOT EXISTS emprestimos (
    id SERIAL PRIMARY KEY,
    usuario_id INTEGER NOT NULL REFERENCES usuarios(id),
    livro_id INTEGER NOT NULL REFERENCES livros(id),
    data_emprestimo TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    data_devolucao_prevista TIMESTAMPTZ NOT NULL,
    status VARCHAR DEFAULT 'ATIVO'
);
