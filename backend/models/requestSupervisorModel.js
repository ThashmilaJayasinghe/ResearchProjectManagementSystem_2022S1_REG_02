const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const requestSupervisorModel = new Schema({

        // requestedGroup: {
        //     type: String,
        //     required: true
        // },
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
        message: {
            type: String
        },
        requestStates: {
            type: String,
        },
        requestEvaluatedDate:{
            type:Date,
        }
    },
    {
        timestamps: true
    })

module.exports = mongoose.model('RequestSupervisor', requestSupervisorModel)