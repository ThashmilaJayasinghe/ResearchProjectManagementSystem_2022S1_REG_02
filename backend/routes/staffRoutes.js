const express = require('express');
const { addQualifications, addResearchField, getStaffDetails } = require('../controllers/staffController');
const addStaff = require('../controllers/staffController').addStaff;

const router = express.Router();

router.post('/', addStaff);

// get staff details
router.get('/getStaff', getStaffDetails)

// update qualifications
router.put('/updateQual',addQualifications )

// update research interest
router.put('/updateResearch', addResearchField)

module.exports = router;
