const express = require('express');
const {protect} = require("../middleware/authMiddleware");
const router = express.Router()
const makeSupervisorRequest = require('../controllers/studentController')
const researchGroupEval = require('../controllers/supervisorController')

//add a request
router.route('/addRequest').post(makeSupervisorRequest)

//get all the requests
router.route('/requests').get(researchGroupEval)

module.exports = router;