const { Router } = require('express')
const LoanController = require('../controllers/LoanController')

const router = Router()

router.post('/', LoanController.create)
router.get('/', LoanController.findAll)

module.exports = router