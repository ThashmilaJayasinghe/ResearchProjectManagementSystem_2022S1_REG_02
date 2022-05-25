const mongoose = require('mongoose')

const submissionSchema = mongoose.Schema({
    groups:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Group'
    },
    submissions:[{
        title:{
            type: String
        },
        document:{
            type: String
        },
        type:{
            type: String
        },
        subimit_Date:{
            type:Date,
            default:Date.now()
        }
    }]

})

module.exports = mongoose.model('Submissions', submissionSchema)
