const express = require('express');
const {protect} = require("../middleware/authMiddleware");
const router = express.Router()
const makeSupervisorRequest = require('../controllers/studentController')
// const getAllRequestedSupervisors = require('../controllers/supervisorController').getAllRequestedSupervisors
// const getSupervisorRequest = require('../controllers/supervisorController').getSupervisorRequest
// const requestCheck = require('../controllers/supervisorController').requestCheck

// const getAllRequestedSupervisors = require('../controllers/staffController').getAllRequestedSupervisors
// const getSupervisorRequest = require('../controllers/staffController').getSupervisorRequest
// const requestCheck = require('../controllers/staffController').requestCheck

const getAllRequestedSupervisors = require('../controllers/requestSupervisorController').getAllRequestedSupervisors
const getSupervisorRequest = require('../controllers/requestSupervisorController').getSupervisorRequest
const requestCheck = require('../controllers/requestSupervisorController').requestCheck

const addSupervisor = require('../controllers/supervisorController').addSupervisor
const addQualifications = require('../controllers/staffController').addQualifications 
const addResearchField = require('../controllers/staffController').addResearchField

const get_Group_Sup_request =
	require('../controllers/requestSupervisorController').get_Group_Sup_request;
const get_Group_COSup_request =
	require('../controllers/requestSupervisorController').get_Group_COSup_request;

//add a request

router.post('/supervisor/:id', makeSupervisorRequest);
router.post('/coSupervisor/:id', makeCOSupervisorRequest);

//Get a group details
router.get('/grouprequest/:id', get_Group_Sup_request);
router.get('/groupcorequest/:id', get_Group_COSup_request);

// router.post('/supervisor', makeSupervisorRequest);
// router.post('/coSupervisor', makeCOSupervisorRequest);

//get all the requests
router.get('/requests', getAllRequestedSupervisors);
//
// //get requests according to the supervisor
router.get('/requestedSupervisor', getSupervisorRequest);
//
// //update request states
router.put('/updateRequest/:id', requestCheck);

module.exports = router;
