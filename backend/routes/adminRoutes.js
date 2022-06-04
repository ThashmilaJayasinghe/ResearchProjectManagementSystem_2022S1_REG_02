const express = require('express')
const router = express.Router()
const { addRole, allocateRole, getStaff, getStudents, addAssignment, upload, addPanel, getGroups, getAllPanels, deleteSubmissionType } = require('../controllers/adminController')
const { protect, authRole } = require('../middleware/authMiddleware')
// actual route is /api/admin/

router.post('/addRole', protect, authRole('admin'), addRole)
router.put('/allocateRole/:staffid', protect, authRole('admin'), allocateRole)
router.get('/staff', protect, authRole('admin'), getStaff)
router.get('/students', protect, authRole('admin'), getStudents)
router.post('/addAssignment', protect, authRole('admin'), upload.fields([{name: 'markingScheme', maxCount: 1}, {name: 'template', maxCount: 1}]), addAssignment)
router.post('/addPanel', protect, authRole('admin'), addPanel)
router.get('/groups', protect, authRole('admin'), getGroups)
router.get('/allPanels', protect, authRole('admin'), getAllPanels)
router.delete('/deleteAssignment/:id', protect, authRole('admin'), deleteSubmissionType)

module.exports = router;
