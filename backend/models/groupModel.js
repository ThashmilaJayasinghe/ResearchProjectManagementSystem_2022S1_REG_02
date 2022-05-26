const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const groupSchema = new Schema({
    // title:{
    //     type:String
    // },
    subMemberRegNumber:{
        type:String,
    },

    members:[{
        regNumber:{
            type:String,
        },
        leader:{
            type:Boolean,
            default:false
        },
        // email:{
        //     type: String,
        //     // required: [true,'Please enter an email'],
        //     unique: true,
        //     lowercase: true,
        // }
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

// function arrayLimit(val){
//     return val.length <=4;
// }
const Group = mongoose.model('Group',groupSchema);
module.exports = Group;