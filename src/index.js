require('dotenv').config()
const express = require('express')

const authorRoutes = require('./routes/authors.routes')
const booksRoutes = require('./routes/books.routes')
const userRoutes = require('./routes/users.routes')
const app = express()

app.use(express.json())


app.use('/authors', authorRoutes)
app.use('/books', booksRoutes)
app.use('/users', userRoutes)


const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`)
})