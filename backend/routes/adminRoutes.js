const express = require('express')
const router = express.Router()
const { addRole, allocateRole } = require('../controllers/adminController')
const {protect} = require('../middleware/authMiddleware')
// actual route is /api/roles/

router.post('/addRole', protect, addRole)
router.post('/allocateRole', protect, allocateRole)


module.exports = router