const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const studentSchema = new Schema({

        user:{
            type: mongoose.Schema.Types.ObjectId,
            ref:'User'
        },

        regNumber:{
            type:String,
            required:true
        },
    },
    {
        timestamps: true
    })
const Student = mongoose.model('Student',studentSchema);
module.exports = Student;