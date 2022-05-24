const requestSupervisor = require('../models/requestSupervisorModel')
const asyncHandler = require("express-async-handler");

module.exports.post_request = (req,res) => {
    const requestedGroupID = req.body.title;
    const supervisorName = req.body.title;
    const supervisorEmail = req.body.title;
    const topic = req.body.title;
    const message = req.body.description;

    const newRequest = new requestSupervisor( {
        requestedGroupID,
        supervisorName,
        supervisorEmail,
        topic,
        message,
        requestStates:''
    })

    newRequest.save()
        .then(()=>{
            res.json('Requested')
        })
        .catch((err)=>{
            console.log(err)
        })
}

// module.exports.get_requests = (req,res) => {
//     requestSupervisor.find()
//         .then((requests)=>{
//             res.json({success:true,existingPost:requests});
//         })
//         .catch((err) =>{
//             console.log(err);
//         })
// }

// module.exports.update_request = (req,res) => {
//     let requestedGroupID = req.params.id;//Have to think about how to get group id
//     const { supervisorName, supervisorEmail, topic, message} = req.body;
//
//     const updateRequest = {
//         supervisorName,
//         supervisorEmail,
//         topic,
//         message
//     };
//
//     const update = requestSupervisor.findByIdAndUpdate(requestedGroupID,updateRequest)
//         .then(()=>{
//             res.status(200).send({
//                 status:'New request added'
//             });
//         }).catch((err)=>{
//             console.log(err);
//             res.status(200).send({status:'error with updating request', error:err.message});
//         })
// }

module.exports.get_Group_request = (res,req)=>{

}

//accept or reject student groups according to the research field
module.exports.getAllRequestedSupervisors = asyncHandler(async (req, res) => {
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
module.exports.getSupervisorRequest  = asyncHandler(async (req, res) => {

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
module.exports.requestCheck = asyncHandler(async (req, res) => {

    const reqId = req.params.id;
    const reqStates = req.body.requestStates;

    try{
        const updatedResult = await requestSupervisor.findByIdAndUpdate(reqId, {requestStates:reqStates})
        res.status(200).json(updatedResult);
    }catch (err){
        console.log(err)
    }

})

