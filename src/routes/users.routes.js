const { Router } = require('express')
const UserController = require('../controllers/UserController')

const router = Router()

router.post('/', UserController.create)
router.get('/', UserController.findAll)
router.put('/:id', UserController.update)
router.delete('/:id', UserController.delete)

module.exports = router