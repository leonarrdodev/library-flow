const BookRepository = require('../repositories/BookRepository')

class BookController {
    //criar livro
    async create(req, res){
        const {titulo, autor_id, quantidade_disponivel} = req.body

        if(!titulo || !autor_id){
            return res.status(400).json({erro: 'Campos obrigatorios (Titulo, ID do autor)'}
            )
        }

        try{
            const book = await BookRepository.create(titulo, autor_id, quantidade_disponivel)
            return res.status(201).json({book})
        } catch(err){
            res.status(500).json({error: 'Erro ao criar livro', details: err.message})
        }
    }

    //buscar todos os livros
    async findAll(req, res){
        try {
            const books = await BookRepository.findAll()
            return res.status(200).json({books})
        } catch(err){
            res.status(500).json({error: 'Erro ao buscar livros', details: err.message})
        }
    }

    //atualizar livro
    async update(req, res){
        const id = req.params.id
        const {titulo, autor_id, quantidade_disponivel} = req.body

        if(!titulo || !autor_id){
            return res.status(400).json({erro: 'Campos obrigatorios (Titulo, ID do autor)'}
            )
        }

        try{
            const book = await BookRepository.update(id, titulo, autor_id, quantidade_disponivel)
            if(book == null || book === undefined){
                return res.status(404).json({error: 'Livro não encontrado'})
            }

            res.status(200).json({book})
        } catch(err){
            res.status(500).json({error: 'Erro ao atualizar livro', details: err.message})
        }
    }

    //deletar livro
    async delete(req, res){
        const id = req.params.id

        try{
            const bookDelete = await BookRepository.delete(id)

            if(!bookDelete){
                return res.status(404).json({errpr: 'Livro não existe'})
            }

            res.status(204).send()
        } catch(err){
            res.status(500).json({error: 'Erro ao deletar livro', details: err.message})
        }
    }
}

module.exports = new BookController()