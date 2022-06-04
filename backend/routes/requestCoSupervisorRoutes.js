const express = require('express');
const { coSupervisorRequestCheck, getCoSupervisorRequest, getAllRequestedCoSupervisors } = require('../controllers/requestCoSupervisorController');
const router = express.Router()


//get all the requests
router.get('/coSupervisorRequests', getAllRequestedCoSupervisors);

//get requests according to the supervisor
router.get('/requestedCoSupervisor', getCoSupervisorRequest);

//update request states
router.put('/updateCoSupervisorRequest/:id', coSupervisorRequestCheck);

module.exports = router;