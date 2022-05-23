const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const groupSchema = new Schema({
    // title:{
    //     type:String
    // },
    members:[{
        regNumber:{
            type:String,
            required:true
        },
        leader:{
            type:Boolean,
            default:false
        },
        email:{
            type: String,
            required: [true,'Please enter an email'],
            unique: true,
            lowercase: true,
        },
        // validate:[arrayLimit,"You are exceeding your member limits"]
    }],
    reg_Date:{
        type:Date,
        default:Date.now()
    },
    supervisor:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Supervisor'
    },
    // supervisorName:{
    //     type:String
    // },
    // coSupervisorName:{
    //     type:String
    // },
    coSupervisor:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Supervisor'
    }

})

function arrayLimit(val){
    return val.length <=4;
}
const Group = mongoose.model('Group',groupSchema);
module.exports = Group;