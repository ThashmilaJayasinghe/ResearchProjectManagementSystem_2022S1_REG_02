const mongoose = require('mongoose')

const goalSchema = mongoose.Schema({
    user: {
        // type is the _id of a user
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        // type of model the id belongs to
        ref: 'User'
    },
    text: {
        type: String,
        required: [true, 'Please add a text value']
    }
},
    {
    timestamps: true
})

module.exports = mongoose.model('Goal', goalSchema)