const mongoose = require('mongoose')

const submissionTypeSchema = mongoose.Schema({
    title:{
        type:String,
        required: true
    },
    type:{
        type:String,
        required: true
    },
    instructions:{
        type: String,
        required: true
    },
    dueDate:{
        type: Date,
        required: true
    },
    markingSchema:{
        type: String,
        required: true
    },
    template:{
        type: String,
        required: true
    },

},
    {
        timestamps: true
})

module.exports = mongoose.model('SubmissionType', submissionTypeSchema)
