const db = require('../config/db')

class UserRepository {
    //Criar usuario
    async create(nome, email){
        const query = `
            INSERT INTO usuarios (nome, email)
            VALUES ($1, $2)
            RETURNING *
        `

        const values = [nome, email]
        const result = await db.query(query, values)
        return result.rows[0]
    }

    //busca todos os usuarios
    async findAll() {
            const query = `SELECT * FROM usuarios`
    
            const result = await db.query(query)
            return result.rows
    }

    //atualizar usuario
    async update(id, nome, email){
        const query = `
            UPDATE usuarios
            SET nome = $1, email = $2
            WHERE id = $3
            RETURNING *
        `

        const values = [nome, email, id]
        const result = await db.query(query, values)
        return result.rows[0]
    }

    //deletar usuario
    async delete(id){
        const query = `
            DELETE FROM usuarios
            WHERE id = $1
            RETURNING *
        `

        const value = [id]
        const result = await db.query(query, value)
        return result.rows[0]
    }
}


module.exports = new UserRepository()