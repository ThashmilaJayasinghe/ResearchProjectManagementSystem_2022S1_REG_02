const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const staffSchema = new Schema({
        user:{
            type: mongoose.Schema.Types.ObjectId,
            ref:'User'
        },
        qualifications: [{
            type: String
        }],
        researchInterests: [{
            type: String,
            default: undefined
        }],
        type:[{
            type:String,
        }]
        },
   )
const Supervisor = mongoose.model('Staff',staffSchema);