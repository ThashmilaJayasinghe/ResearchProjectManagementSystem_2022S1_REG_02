const asyncHandler = require('express-async-handler');
const Supervisor = require('../models/supervisorModel');
const requestSupervisor = require('../models/requestSupervisorModel');

//accept or reject student groups according to the research field
const getAllSupervisors = asyncHandler(async (req, res) => {
	Supervisor.find()
		.then((supervisor) => {
			res.json(supervisor);
		})
		.catch((err) => {
			console.log(err);
		});
});
//
// //get requests according to the supervisor
// const getSupervisorRequest  = asyncHandler(async (req, res) => {
//
//     // const supervisorEmail = req.body.supervisorEmail;
//
//     const supervisorEmail = req.query.supervisorEmail
//
//     try{
//         const result = await requestSupervisor.findOne({supervisorEmail})
//         res.status(200).json(result)
//
//     }catch (err){
//         console.error("supervisor request getting not success")
//         console.log("Error in supervisor requests")
//     }
//
// })
//
// //accept or reject request
// const requestCheck = asyncHandler(async (req, res) => {
//
//     const reqId = req.params.id;
//     const reqStates = req.body.requestStates;
//
//     try{
//         const updatedResult = await requestSupervisor.findByIdAndUpdate(reqId, {requestStates:reqStates})
//         res.status(200).json(updatedResult);
//     }catch (err){
//         console.log(err)
//     }
//
// })
//
// // module.exports = {
// //     getAllRequestedSupervisors,
// //     getSupervisorRequest
// // }
//
module.exports.getAllSupervisors = getAllSupervisors;
// module.exports.getSupervisorRequest = getSupervisorRequest
// module.exports.requestCheck = requestCheck
