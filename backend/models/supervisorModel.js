const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const supervisorSchema = new Schema({
        name:{
            type:String,
            required:true
        },
        email:{
            type: String,
            required: [true,'Please enter an email'],
            unique: true,
            lowercase: true,
        },
        password:{
            type:String,
            required: [true, 'Please enter a valid password'],
            // minlength: [6, 'Minimum password length must be 6 characters']
        },
        // user:{
        //     type: mongoose.Schema.Types.ObjectId,
        //     ref:'User'
        // },
        qualifications: [{
            type: String
        }],
        researchInterests: [{
            type: String,
            default: undefined
        }]
    }
   )
const Supervisor = mongoose.model('Supervisor',supervisorSchema);
module.exports = Supervisor