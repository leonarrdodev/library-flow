const { Router } = require('express')
const BookController = require('../controllers/BookController')

const router = Router()

router.post('/', BookController.create)
router.get('/', BookController.findAll)
router.put('/:id', BookController.update)
router.delete('/:id', BookController.delete)

module.exports = router