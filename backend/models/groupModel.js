const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const groupSchema = new Schema({
    title:{
        type:String
    },
    members:[{
        studentID:{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Student'
        }
    }],
    supervisor:{
        id:{type:String,required:true},
        name:{type:String},
        email:{type:String}
    },
    // supervisorName:{
    //     type:String
    // },
    // coSupervisorName:{
    //     type:String
    // },
    coSupervisor:{
        id:{type:String,required:true},
        name:{type:String},
        email:{type:String}
    },
    documents:[{
        documentID:{
            type:String
        },
        document:{
            //pdf ekak hari word doc ekak hari
            type:String
        },

    }]

})
const Group = mongoose.model('Group',groupSchema);