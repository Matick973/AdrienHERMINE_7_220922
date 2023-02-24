const express= require('express')
const router = express.Router()

const auth = require('../middleware/auth')
const passvalidator = require('../middleware/passvalidator')
const multer = require('../middleware/multer-config') 

const userCtrl = require('../controllers/user_controller')

// Routes Users 

router.post('/signup', passvalidator, userCtrl.signup)
router.post('/login', userCtrl.login)
router.get('/logout', userCtrl.logout)

router.get('/', auth, userCtrl.allUsers)
router.get('/:id', auth, userCtrl.oneUser)
router.put('/:id', auth, multer, userCtrl.modifyUser)
router.delete('/:id', auth, userCtrl.deleteUser)

module.exports = router