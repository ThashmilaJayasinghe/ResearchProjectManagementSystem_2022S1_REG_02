const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const studentSchema = new Schema({
        // name:{
        //     type:String,
        //     required:true
        // },
        user:{
            type: mongoose.Schema.Types.ObjectId,
            ref:'User'
        },

        regNumber:{
            type:String,
            required:true
        },
        // email:{
        //     type: String,
        //     required: [true,'Please enter an email'],
        //     unique: true,
        //     lowercase: true,
        // },
        // password:{
        //     type:String,
        //     required: [true, 'Please enter a valid password'],
        //     // minlength: [6, 'Minimum password length must be 6 characters']
        // },
        // registeredDate:{
        //     type:Date,
        //
        // }
    },
    {
        timestamps: true
    })
const Student = mongoose.model('Student',studentSchema);
module.exports = Student;