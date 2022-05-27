const mongoose = require('mongoose')

const requestSupervisorModel = mongoose.Schema({

        requestedGroupID: {
            type: String,
            required: true
        },
        supervisorName: {
            type: String,
            required: true
        },
        supervisorEmail: {
            type: String,
            required: true
        },
        topic: {
            type:String
        },
        details: {
            type: String
        },
        requestStates: {
            type: String,
        },
       
    },
    {
        timestamps: true
    })

module.exports = mongoose.model('RequestSupervisor', requestSupervisorModel)