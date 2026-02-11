const LoanRepository = require('../repositories/LoanRepository')
const BookRepository = require('../repositories/BookRepository')

class LoanController {
    //criar emprestimo
    async create(req, res) {
        const {usuario_id, livro_id, data_devolucao_prevista} = req.body
        

        if(!usuario_id || !livro_id || !data_devolucao_prevista){
            return res.status(400).json({error: 'Id do usuario e Id do livro e data prevista de devolução são obrigatorios'})
        }

        try{

            const book = await BookRepository.findById(livro_id)

            if(!book){
                return res.status(404).json({error: 'Livro não encontrado'})
            }

            if(book.quantidade_disponivel < 1){
                return res.status(400).json({error: 'Livro indisponivel'})
            }

            const loan = await LoanRepository.create(usuario_id, livro_id, data_devolucao_prevista)
            await BookRepository.updateStock(livro_id, book.quantidade_disponivel -1)
            return res.status(201).json({loan})

        } catch(err){
            res.status(500).json({error: 'Erro ao criar emprestimo', details: err.message})
        }
    }

    //buscar todos os emprestimos
    async  findAll(req, res) {
        try{
            const loans = await LoanRepository.findAll()
            return res.status(200).json({loans})
        } catch(err){
            res.status(500).json({error: 'Erro ao buscar emprestimos', details: err.message})
        }
    }
}

module.exports = new LoanController()