const express= require('express')
const router = express.Router()

const passvalidator = require('../middleware/passvalidator')
const userCtrl = require('../controllers/user_controller')
const auth = require('../middleware/auth')

router.post('/signup', passvalidator, userCtrl.signup)
router.post('/login', userCtrl.login)
router.get('/logout', userCtrl.logout)

router.get('/', auth, userCtrl.allUsers)
router.get('/:id', auth, userCtrl.oneUser)
router.put('/:id', auth, userCtrl.modifyUser)
router.delete('/:id', auth, userCtrl.deleteUser)

module.exports = router