const db = require('../config/db')

class BookRepository {
    //criar livro
    async create(titulo, autor_id, quantidade_disponivel){
        const query = `
            INSERT INTO livros (titulo, autor_id, quantidade_disponivel)
            VALUES ($1, $2, $3)
            RETURNING *
        `

        const values = [titulo, autor_id, quantidade_disponivel]
        const result = await db.query(query, values)
        return result.rows[0]
    }

    //buscar todos os livros
    async findAll(){
        const query = `
            SELECT livros.*, autores.nome AS nome_autor
            FROM livros 
            INNER JOIN autores ON livros.autor_id = autores.id
        `

        const result = await db.query(query)
        return result.rows
    }

    //atualizar livro
    async update(id, titulo, autor_id, quantidade_disponivel){
        const query = `
            UPDATE livros
            SET titulo = $1, autor_id = $2, quantidade_disponivel = $3
            WHERE id = $4
            RETURNING *
        `

        const values = [titulo, autor_id, quantidade_disponivel, id]
        const result = await db.query(query, values)
        return result.rows[0]
    }

    //deletar livro
    async delete(id){
        const query = `
            DELETE FROM livros
            WHERE id = $1
            RETURNING *
        `

        const value = [id]
        const result = await db.query(query, value)
        return result.rows[0]
    }
}

module.exports = new BookRepository()