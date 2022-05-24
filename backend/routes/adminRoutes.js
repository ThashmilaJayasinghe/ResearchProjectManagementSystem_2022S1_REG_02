const express = require('express')
const router = express.Router()
const { addRole, allocateRole, getStaff } = require('../controllers/adminController')
const { protect, authRole } = require('../middleware/authMiddleware')
// actual route is /api/admin/

router.post('/addRole', protect, addRole)
router.put('/allocateRole/:staffid', protect, allocateRole)
router.get('/staff', protect, getStaff)


module.exports = router