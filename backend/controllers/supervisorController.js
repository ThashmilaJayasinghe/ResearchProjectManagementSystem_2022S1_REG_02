const asyncHandler = require('express-async-handler')
const Supervisor = require('../models/supervisorModel')
const requestSupervisor = require('../models/requestSupervisorModel');

// get all supervisors
const getAllSupervisors = asyncHandler(async(req, res) => {

    console.log("I am called")

    try{
        const result = await Supervisor.find();
        res.status(200).json(result)
    }
    catch(err) {
        console.log("Error occured")
    }
    
})


// below are done
module.exports.getAllSupervisors = getAllSupervisors



