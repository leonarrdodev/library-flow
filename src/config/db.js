require('dotenv').config()
const { Pool } = require('pg')

const pool = new Pool ({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASS,
    port: process.env.DB_PORT
})

//exporta função query que pode ser acessado por qualquer arquivo para qualquer tabela
module.exports = {
    query: (text, params) => {
        console.log('Executando a query', text)
        return pool.query(text, params)
    }
}