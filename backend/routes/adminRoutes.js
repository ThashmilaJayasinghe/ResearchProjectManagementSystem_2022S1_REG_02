const express = require('express')
const router = express.Router()
const { addRole, allocateRole, getStaff, getStudents, addAssignment, upload, addPanel, getGroups, getAllPanels } = require('../controllers/adminController')
const { protect, authRole } = require('../middleware/authMiddleware')
// actual route is /api/admin/

router.post('/addRole', addRole)
router.put('/allocateRole/:staffid', allocateRole)
router.get('/staff', getStaff)
router.get('/students', getStudents)
router.post('/addAssignment', upload.fields([{name: 'markingScheme', maxCount: 1}, {name: 'template', maxCount: 1}]), addAssignment)
router.post('/addPanel', addPanel)
router.get('/groups', getGroups)
router.get('/allPanels', getAllPanels)

module.exports = router;
