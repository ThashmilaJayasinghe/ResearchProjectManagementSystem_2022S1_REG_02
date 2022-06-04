const express = require('express')
const router = express.Router()
const { registerUser, loginUser, getMe, getAll, deleteUser, updateUser, getUser } = require('../controllers/userController')
const { protect, authRole } = require('../middleware/authMiddleware')
// actual route is /api/users/

router.post('/', protect, authRole('admin'), registerUser)
router.post('/login', loginUser)
// Private functions are called after the middleware function "protect"
router.get('/me', protect, getMe)
router.get('/all', getAll)
router.delete('/:id', protect, authRole('admin'), deleteUser)
router.put('/:id', protect, authRole('admin'), updateUser)
router.get('/:id', protect, authRole('admin'), getUser)

module.exports = router