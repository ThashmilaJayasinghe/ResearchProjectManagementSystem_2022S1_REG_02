const asyncHandler = require('express-async-handler')
// const Student = require('../models/studentModel')
const requestSupervisor = require('../models/requestSupervisorModel');

const makeSupervisorRequest = asyncHandler(async (req, res) => {

    try{
        const result = await requestSupervisor.create({
            requestedGroupID: req.body.groudID,
            supervisorName: req.body.supervisorName ,
            supervisorEmail:  req.body.supervisorEmail,
            topic:  req.body.topic,
            details:  req.body.details,
            requestStates:  req.body.requestStates,
    
        })

        res.status(200).json(result)

    }catch (err){
        console.error(err)
        console.log("Request not sent")
    }
})

module.exports = makeSupervisorRequest