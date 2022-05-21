const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const topicStatusSchema = new Schema({
    grp_ID : {
        type : String,
        required : true
    },
    supervisorName : {
        type : String,
        required : true
    },
    title : {
        type : String,
        required : true
    },
    status : {
        type : String,
        required : true
    },
    message : {
        type : String
    },
    evaluated_Date : {
        type : Date,
        default: Date.now
    },
})

const topicStatusModel = mongoose.model("topicStatusModel", topicStatusSchema);
module.exports = topicStatusModel;