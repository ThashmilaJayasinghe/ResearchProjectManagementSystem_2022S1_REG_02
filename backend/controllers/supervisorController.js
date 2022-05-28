const asyncHandler = require('express-async-handler')
const Supervisor = require('../models/supervisorModel')
const requestSupervisor = require('../models/requestSupervisorModel');

//accept or reject student groups according to the research field
const getAllRequestedSupervisors = asyncHandler(async (req, res) => {
    const result = await requestSupervisor.find()

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
const getSupervisorRequest  = asyncHandler(async (req, res) => {

    // const supervisorEmail = req.body.supervisorEmail;

    const supervisorEmail = req.query.supervisorEmail

    try{
        const result = await requestSupervisor.findOne({supervisorEmail})
        res.status(200).json(result)

    }catch (err){
        console.error("supervisor request getting not success")
        console.log("Error in supervisor requests")
    }

})

//accept or reject request
const requestCheck = asyncHandler(async (req, res) => {

    const reqId = req.params.id;
    const reqStates = req.body.requestStates;

    try{
        const updatedResult = await requestSupervisor.findByIdAndUpdate(reqId, {requestStates:reqStates})
        res.status(200).json(updatedResult);
    }catch (err){
        console.log(err)
    }

})

// ############################################  for testing
// add supervisor to the database
const addSupervisor = asyncHandler(async(req, res) => {

    const data = req.body;
    console.log(data)

    try{
        const result = await Supervisor.create({name, email, password, qualifications, researchInterests} = data)
        res.status(200).json(result)
    }
    catch(err){
        console.log(err)
    }
})
// ########################## testing over


//update the qualifications of supervisor 
const addQualifications = asyncHandler(async(req, res) => {

    const newQualification = req.body.qualifications;
    const email = req.body.email;

    try{
        const updateResult = await Supervisor.findOneAndUpdate({email:email},{ $push : {qualifications: newQualification}})
        res.status(200).json(updateResult)
    }catch(err){
        console.log(err)
    }
}) 

//update the research field of supervisor 
const addResearchField = asyncHandler(async(req, res) => {

    const newResearchFeild = req.body.researchInterests;
    const email = req.body.email;

    try{
        const updateResult = await Supervisor.findOneAndUpdate({email:email},{ $push : {researchInterests: newResearchFeild}})
        res.status(200).json(updateResult)
    }catch(err){
        console.log(err)
    }
}) 



// module.exports = {
//     getAllRequestedSupervisors,
//     getSupervisorRequest
// }

module.exports.getAllRequestedSupervisors = getAllRequestedSupervisors
module.exports.getSupervisorRequest = getSupervisorRequest
module.exports.requestCheck = requestCheck

// below are done
module.exports.addSupervisor = addSupervisor
module.exports.addQualifications = addQualifications
module.exports.addResearchField = addResearchField



