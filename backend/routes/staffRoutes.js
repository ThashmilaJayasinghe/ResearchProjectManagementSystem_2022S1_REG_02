const express = require('express');
const { addQualifications, addResearchField, getStaffDetails, removeQualifications, removeResearchInterests } = require('../controllers/staffController');

const getAllSupervisors =
	require('../controllers/staffController').getAllSupervisors;

const addStaff = require('../controllers/staffController').addStaff;


const router = express.Router();

router.post('/', addStaff);

router.get('/', getAllSupervisors);


// get staff details
router.get('/getStaff', getStaffDetails)

// update qualifications
router.put('/updateQual',addQualifications )

// update research interest
router.put('/updateResearch', addResearchField)

// delete qualification
router.put('/deleteQual', removeQualifications)
// delete research interest
router.put('/deleteResearch', removeResearchInterests)

module.exports = router;
