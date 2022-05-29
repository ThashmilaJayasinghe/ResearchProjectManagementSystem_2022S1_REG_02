const express = require('express');
const {protect} = require("../middleware/authMiddleware");
const router = express.Router()
const makeSupervisorRequest = require('../controllers/requestSupervisorController').post_request
const makeCOSupervisorRequest = require('../controllers/requestSupervisorController').post_Co_request

const getAllRequestedSupervisors = require('../controllers/requestSupervisorController').getAllRequestedSupervisors
const getSupervisorRequest = require('../controllers/requestSupervisorController').getSupervisorRequest
const requestCheck = require('../controllers/requestSupervisorController').requestCheck

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

//get all the requests
router.get('/requests', getAllRequestedSupervisors);
//
// //get requests according to the supervisor
router.get('/requestedSupervisor', getSupervisorRequest);
//
// //update request states
router.put('/updateRequest/:id', requestCheck);

module.exports = router;
