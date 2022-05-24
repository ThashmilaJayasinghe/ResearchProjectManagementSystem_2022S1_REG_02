const asyncHandler = require('express-async-handler')
const Student = require('../models/studentModel')
const mongoose = require("mongoose");
// const requestSupervisor = require('../models/requestSupervisorModel');

// const makeSupervisorRequest = asyncHandler(async (req, res) => {
//
//     try{
//         const result = await requestSupervisor.create({
//             requestedGroupID: req.body.groudID,
//             requestedGroup: req.body.group,
//             supervisorName: req.body.supervisorName ,
//             supervisorEmail:  req.body.supervisorEmail,
//             topic:  req.body.topic,
//             details:  req.body.details,
//             requestStates:  req.body.requestStates,
//             requestEvaluatedDate:  req.body.requestEvaluatedDate,
//         })
//
//         res.status(200).json(result)
//
//     }catch (err){
//         console.error(err)
//         console.log("Request not sent")
//     }
// })

module.exports.set_data = (req,res)=>{
    const user = req.params.id;
    const regNumber = req.body.regNumber;

    if(user){
        const student = new Student({
            user,
            regNumber
        })

        student.save()
            .then(()=>{
                res.json('student is added')
            })
            .catch((err)=>{
                console.log(err)
            })
    }
    else {
        res.status(500).send("User is not there")
    }
}


