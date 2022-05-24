const mongoose = require('mongoose')

const submissionSchema = mongoose.Schema({
    // title:{
    //     type:String
    // },
    groups:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Group'
    },
    // supervisor:{
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: 'Supervisor'
    // },
    // coSupervisor:{
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: 'Supervisor'
    // },
    submissions:[{
        title:{
            type: String
        },
        document:{
            type: String
        },
        subimit_Date:{
            type:Date,
            default:Date.now()
        }
    }]

})

module.exports = mongoose.model('Submissions', submissionSchema)
