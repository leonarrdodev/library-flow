const db = require('../config/db')

class LoanRepository {
    //criar emprestimo
    async create(usuario_id, livro_id, data_devolucao_prevista){
        const query = `
            INSERT INTO emprestimos (usuario_id, livro_id, data_devolucao_prevista)
            VALUES ($1, $2, $3)
            RETURNING *
        `

        const values = [usuario_id, livro_id, data_devolucao_prevista]
        const result = await db.query(query, values)
        return result.rows[0]
    }

    //buscar todos os emprestimos 
    async findAll(){
        const query = `
            SELECT emprestimos.*, 
            usuarios.nome AS nome_usuario,
            usuarios.email AS email_usuario,
            livros.titulo AS titulo_livro
            FROM emprestimos
            JOIN usuarios ON emprestimos.usuario_id = usuarios.id 
            JOIN livros ON emprestimos.livro_id = livros.id
        `
        const result = await db.query(query)
        return result.rows
    }

    //atualizar emprestimo 
    async update(id, status){
        const query = `
            UPDATE emprestimos
            SET status = $1
            WHERE id = $2
            RETURNING * 
        `

        const values = [status, id]
        const result = await db.query(query, values)
        return result.rows[0]
    }

    async delete(id){
        const query = `
            DELETE from emprestimos
            WHERE id = $1
            RETURNING *
        `

        const value = [id]
        const result = await db.query(query, value)
        return result.rows[0]
    }
}

module.exports = new LoanRepository()