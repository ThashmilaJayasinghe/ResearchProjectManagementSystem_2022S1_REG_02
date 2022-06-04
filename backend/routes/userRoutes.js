const express = require('express')
const router = express.Router()
const { registerUser, loginUser, getMe, getAll, deleteUser, updateUser, getUser } = require('../controllers/userController')
const { protect } = require('../middleware/authMiddleware')
// actual route is /api/users/

router.post('/', registerUser)
router.post('/login', loginUser)
// Private functions are called after the middleware function "protect"
router.get('/me', protect, getMe)
router.get('/all', getAll)
router.delete('/:id', deleteUser)
router.put('/:id', updateUser)
router.get('/:id', getUser)

module.exports = router