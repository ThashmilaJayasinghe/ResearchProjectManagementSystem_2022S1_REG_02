const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const topicStatusSchema = new Schema({
    status : {
        type : String,
        required : true
    },
    message : {
        type : String
    }
})

const topicStatus = mongoose.model("topicStatus", topicStatusSchema);
module.exports = topicStatus;