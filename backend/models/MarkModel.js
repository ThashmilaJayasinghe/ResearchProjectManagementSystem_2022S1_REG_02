const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const grp_Marks_Schema = new Schema({
    grp_ID : {
        type : String,
        required : true
    },
    submissions : [{
        submissionID:{
            type: String,
            required: [true, 'Please add submissionID'],
        },

        submission : {
            type: String,
            required: [true, 'Please add assignment name'],
        },
        submissionType: {
            type: String,
            required: [true, 'Please add assignment type'],
        },
        document:{
            type: String
        },
        mark : {
            type : Number,
            required : true
        },
        evaluator_ID : {
            type : String
        },
        evaluated_Date : {
            type : Date,
            default: Date.now
        }
    }]
    // supervisor_mark : {
    //     type : Number
    // },
    // PanelMember_Mark : {
    //     type : Number
    // },
    // BlindReviver_Mark :{
    //     type : Number
    // }
})

const group_Mark = mongoose.model('group_Mark', grp_Marks_Schema)
module.exports = group_Mark;