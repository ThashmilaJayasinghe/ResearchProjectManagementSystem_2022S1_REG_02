const express = require('express');
const {protect} = require("../middleware/authMiddleware");
const router = express.Router()
const makeSupervisorRequest = require('../controllers/studentController')
// const getAllRequestedSupervisors = require('../controllers/supervisorController').getAllRequestedSupervisors
// const getSupervisorRequest = require('../controllers/supervisorController').getSupervisorRequest
// const requestCheck = require('../controllers/supervisorController').requestCheck
const getAllRequestedSupervisors = require('../controllers/staffController').getAllRequestedSupervisors
const getSupervisorRequest = require('../controllers/staffController').getSupervisorRequest
const requestCheck = require('../controllers/staffController').requestCheck

const addSupervisor = require('../controllers/supervisorController').addSupervisor
const addQualifications = require('../controllers/supervisorController').addQualifications 

//add a request
router.post('/addRequest', makeSupervisorRequest)

//get all the requests
// router.get('/requests',getAllRequestedSupervisors)
router.get('/requests',getAllRequestedSupervisors)

//get requests according to the supervisor
router.get('/requestedSupervisor', getSupervisorRequest)

//update request states
router.put('/updateRequest/:id', requestCheck)


// add a supervisor for sample check
router.post('/addSupervisor',addSupervisor )

// update qualifications
router.put('/updateQual',addQualifications )

module.exports = router;