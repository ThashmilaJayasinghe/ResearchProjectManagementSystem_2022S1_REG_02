const asyncHandler = require('express-async-handler')
const Supervisor = require('../models/supervisorModel')
const requestSupervisor = require('../models/requestSupervisorModel');

// const researchTopicEval = asyncHandler(async (req, res) => {
//     const result = await
// })

//accept or reject student groups according to the research field
const researchGroupEval = asyncHandler(async (req, res) => {
    const result = await requestSupervisor.find()

    if(result){
        res.json({
            request: result
        })
    }else{
        res.status(400)
        throw new Error("Empty requests!")
    }
})

module.exports = researchGroupEval;

