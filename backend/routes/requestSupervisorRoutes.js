const express = require('express');
const { protect } = require('../middleware/authMiddleware');
const router = express.Router();
const makeSupervisorRequest =
	require('../controllers/requestSupervisorController').post_request;
const makeCOSupervisorRequest =
	require('../controllers/requestSupervisorController').post_Co_request;
// const Requests = require('../controllers/requestSupervisorController').get_requests
// const updateRequest = require('../controllers/requestSupervisorController').update_request
const getAllRequestedSupervisors =
	require('../controllers/requestSupervisorController').getAllRequestedSupervisors;
const getSupervisorRequest =
	require('../controllers/requestSupervisorController').getSupervisorRequest;
const requestCheck =
	require('../controllers/requestSupervisorController').requestCheck;

//add a request
router.post('/supervisor', makeSupervisorRequest);
router.post('/coSupervisor', makeCOSupervisorRequest);

//get all the requests
router.get('/requests', getAllRequestedSupervisors);
//
// //get requests according to the supervisor
router.get('/requestedSupervisor', getSupervisorRequest);
//
// //update request states
router.put('/updateRequest/:id', requestCheck);

module.exports = router;
