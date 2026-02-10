const db = require('../config/db')

class AuthorRepository {
    async create(nome, nacionalidade) {
        const query = `
            INSERT INTO autores (nome, nacionalidade)
            VALUES ($1, $2)
            RETURNING *;
        `
        const values = [nome, nacionalidade]
        const result = await db.query(query, values)
        return result.rows[0]
    }

    async findAll() {
        const query = `SELECT * FROM autores`

        const result = await db.query(query)
        return result.rows
    }

    async update(id, nome, nacionalidade){
        const query = `
            UPDATE autores
            SET nome = $1, nacionalidade = $2
            WHERE id = $3
            RETURNING *
        `

        const values = [nome, nacionalidade, id]
        const result = await db.query(query, values)
        return result.rows[0]
    }

    async delete(id){
        const query = `
            DELETE FROM autores 
            WHERE id = $1
            RETURNING *
        `

        const value = [id]
        const result = await db.query(query, value)
        return result.rows[0]
    }
}


module.exports = new AuthorRepository()