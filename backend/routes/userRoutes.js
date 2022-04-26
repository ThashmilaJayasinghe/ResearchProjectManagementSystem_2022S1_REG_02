const express = require('express')
const router = express.Router()
const {registerUser, loginUser, getMe, allocateRole} = require('../controllers/userController')
const {protect} = require('../middleware/authMiddleware')
// actual route is /api/users/

router.post('/', registerUser)
router.post('/login', loginUser)
// getMe is a private function that is called after the middleware function protect
router.get('/me', protect, getMe)
router.put('/role', protect, allocateRole)

module.exports = router