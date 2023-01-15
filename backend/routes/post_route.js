const express = require('express')
const router = express.Router()

const auth = require('../middleware/auth')
const multer = require('../middleware/multer-config')  

const postCtrl = require('../controllers/post_controller')

// Routes Posts 

router.post('/', auth, multer, postCtrl.createPost)
router.put('/:id', auth, multer, postCtrl.modifyPost)
router.delete('/:id', auth, postCtrl.deletePost)
router.patch('/like/:id', postCtrl.likePost)
router.get('/', auth, postCtrl.allPost)
router.get('/:id', auth, postCtrl.onePost)

module.exports = router