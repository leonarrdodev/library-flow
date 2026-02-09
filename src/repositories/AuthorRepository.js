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
}


module.exports = new AuthorRepository()