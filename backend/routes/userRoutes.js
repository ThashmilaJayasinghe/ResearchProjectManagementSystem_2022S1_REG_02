const express = require('express')
const router = express.Router()
const { registerUser, loginUser, getMe, getAll, deleteUser, updateUser, getUser } = require('../controllers/userController')
const { protect, authRole } = require('../middleware/authMiddleware')
// actual route is /api/users/

router.post('/', registerUser)
router.post('/login', loginUser)
// Private functions are called after the middleware function "protect"
router.get('/me', protect, getMe)
router.get('/all', protect, getAll)
router.delete('/:id', protect, deleteUser)
router.put('/:id', protect, updateUser)
router.get('/:id', protect, getUser)

module.exports = router