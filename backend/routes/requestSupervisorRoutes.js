const express = require('express');
const {protect} = require("../middleware/authMiddleware");
const router = express.Router()
const makeSupervisorRequest = require('../controllers/studentController')
const getAllRequestedSupervisors = require('../controllers/supervisorController').getAllRequestedSupervisors
const getSupervisorRequest = require('../controllers/supervisorController').getSupervisorRequest
const requestCheck = require('../controllers/supervisorController').requestCheck


//add a request
router.post('/addRequest', makeSupervisorRequest)

//get all the requests
router.get('/requests',getAllRequestedSupervisors)

//get requests according to the supervisor
router.get('/requestedSupervisor', getSupervisorRequest)

//update request states
router.put('/updateRequest/:id', requestCheck)

module.exports = router;