const express = require('express');
const router = express.Router();
const {
	addRole,
	allocateRole,
	getStaff,
	addAssignment,
} = require('../controllers/adminController');
const { protect, authRole } = require('../middleware/authMiddleware');
// actual route is /api/admin/

router.post('/addRole', addRole);
router.put('/allocateRole/:staffid', allocateRole);
router.get('/staff', getStaff);
router.post('/addAssignment', addAssignment);

module.exports = router;
