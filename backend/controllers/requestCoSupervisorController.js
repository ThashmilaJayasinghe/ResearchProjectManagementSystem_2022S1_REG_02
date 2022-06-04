const asyncHandler = require('express-async-handler')
const RequestCOSupervisor = require('../models/requestCOSupervisorModel');

//accept or reject student groups according to the research field
const getAllRequestedCoSupervisors = asyncHandler(async (req, res) => {
    const result = await RequestCOSupervisor.find()

    if(result){
        res.json({
            response: result
        })
    }else{
        res.status(400)
        throw new Error("Empty requests!")
    }
})

//get requests according to the supervisor
const getCoSupervisorRequest  = asyncHandler(async (req, res) => {

    // const supervisorEmail = req.body.supervisorEmail;
   
    const supervisorEmail = req.query.supervisorEmail

    try{
        const result = await RequestCOSupervisor.find({supervisorEmail})
        res.status(200).json(result)


    }catch (err){
        console.error("supervisor request getting not success")
        console.log("Error in supervisor requests")
    }

})

//accept or reject request
const coSupervisorRequestCheck = asyncHandler(async (req, res) => {

    const reqId = req.params.id;
    const reqStates = req.body.requestStates;

    try{
        const updatedResult = await RequestCOSupervisor.findByIdAndUpdate(reqId, {requestStates:reqStates})
        res.status(200).json(updatedResult);
    }catch (err){
        console.log(err)
    }

})

module.exports.getAllRequestedCoSupervisors = getAllRequestedCoSupervisors
module.exports.getCoSupervisorRequest = getCoSupervisorRequest
module.exports.coSupervisorRequestCheck = coSupervisorRequestCheck