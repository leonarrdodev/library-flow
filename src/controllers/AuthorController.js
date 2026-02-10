const AuthorRepository = require('../repositories/AuthorRepository')

class AuthorController {
    //criar autor
    async create(req, res) {
        const {nome, nacionalidade} = req.body

        if(!nome){
            return res.status(400).json({error: 'Nome é obrigatorio'})
        }

        try{
            const author = await AuthorRepository.create(nome, nacionalidade)
            return res.status(201).json({author})
        } catch(err){
            res.status(500).json({error: 'Erro ao criar autor', details: err.message})
        }
    }

    //encontrar todos os autores
    async findAll(req, res) {
        try{
            const authors = await AuthorRepository.findAll()
            return res.status(200).json({authors})
        } catch(err) {
            res.status(500).json({error: 'Erro ao buscar autores', details: err.message})
        }
    }

    //atualizar autor
    async update(req, res){
        const id = req.params.id
        const {nome, nacionalidade} = req.body

        if(!nome){
            return res.status(400).json({error: 'Nome é obrigatorio'})
        }

        try{
             const author = await AuthorRepository.update(id, nome, nacionalidade)
             if(author === null || author === undefined){
                res.status(404).json({error: 'Autor não encontrado'})
             }

             res.status(200).json({author})
        } catch(err){
            res.status(500).json({error: 'Erro ao atualizar autor', details: err.message})
        }
    }

    //deletar autor
    async delete(req, res){
        const id = req.params.id

        try{
            const authorDelete = await AuthorRepository.delete(id)

            if(!authorDelete){
                res.status(404).json({error: 'Autor não existe'})
            }

            res.status(204).send()
        } catch(err){
            res.status(500).json({error: 'Erro ao deletar autor', details: err.message})
        }
    }
}
module.exports = new AuthorController()