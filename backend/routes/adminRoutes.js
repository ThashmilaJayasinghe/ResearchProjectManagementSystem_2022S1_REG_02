const express = require('express')
const router = express.Router()
const { addRole, allocateRole } = require('../controllers/adminController')
const { protect, authRole } = require('../middleware/authMiddleware')
// actual route is /api/roles/

router.post('/addRole', protect, authRole('admin'), addRole)
router.put('/allocateRole/:staffid', protect, authRole('admin'), allocateRole)


module.exports = router