const mongoose = require('mongoose')

const researchTopic = mongoose.Schema({
        topic: {
            type: String,
            required: true
        },
        requestedGroup: {
            type: String,
            required: true
        },
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
        coSupervisorName: {
            type: String,
            required: true
        },
        coSupervisorEmail: {
            type: String,
            required: true
        },
        topicStates: {
            type: String,
        }
    },
    {
        timestamps: true
    })

module.exports = mongoose.model('ResearchTopic', researchTopic)