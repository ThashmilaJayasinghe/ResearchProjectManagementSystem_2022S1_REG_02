const express = require('express')
const router = express.Router()
const { addRole } = require('../controllers/roleController')
const {protect} = require('../middleware/authMiddleware')
// actual route is /api/roles/

router.post('/add', protect, addRole)


module.exports = router