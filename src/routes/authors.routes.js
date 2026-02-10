const { Router } = require('express')
const AuthorController = require('../controllers/AuthorController')

const router = Router()

router.post('/', AuthorController.create)
router.get('/', AuthorController.findAll)
router.put('/:id', AuthorController.update)
router.delete('/:id', AuthorController.delete)

module.exports = router