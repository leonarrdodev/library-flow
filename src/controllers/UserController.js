const UserRepository = require('../repositories/UserRepository')

class UserController {
    //criar usuario
    async create(req, res) {
        const {nome, email} = req.body
        if(!nome || !email){
            return res.status(400).json({error: 'Nome e email são obrigatorios'})
        }
        
        try{
            const user = await UserRepository.create(nome, email)
            return res.status(201).json({user})
        } catch(err){
            if(err.code === '23505'){
                res.status(409).json({error: 'Email ja cadastrado'})
            } else{
                res.status(500).json({error: 'Erro ao criar usuario', details: err.message})
            }
        }

    }

    //buscar todos os usuarios
    async findAll(req, res){
        try{
            const users = await UserRepository.findAll()
            return res.status(200).json({users})
        } catch(err){
            res.status(500).json({error: 'Erro ao buscar usuarios', details: err.message})
        }
    }

    //atualizar usuario
    async update(req, res){
        const id = req.params.id
        const {nome, email} = req.body

        if(!nome || !email){
            return res.status(400).json({error: 'Nome e email são obrigatorios'})
        }

        try{
            const user = await UserRepository.update(id, nome, email)
            if(user === null || user === undefined){
                return res.status(404).json({error: 'Usuario não encontrado'})
            }
            return res.status(200).json({user})
        } catch(err){
            if(err.code === '23505'){
                res.status(409).json({error: 'Email ja cadastrado'})
            } else{
                res.status(500).json({error: 'Erro ao atualizar usuario', details: err.message})
            }
        }
    }

    //deletar usuario
    async delete(req, res){
        const id = req.params.id

        try{
            const userDelete = await UserRepository.delete(id)

            if(!userDelete){
                return res.status(404).json({error: 'Usuario não existe'})
            }

            res.status(204).send()
        } catch(err){
            res.status(500).json({error: 'Erro ao deletar usuario', details: err.message})
        }
    }
}

module.exports = new UserController()