const mongoose = require('mongoose')

const roleSchema = mongoose.Schema({

        name: {
            type: String,
            required: [true, 'Please add role'],
            unique: true,
        },

        // permissions: [
        //     {
        //         type: mongoose.Schema.Types.ObjectId,
        //         required: true,
        //         ref: 'Permission',
        //     },
        // ],
    }
)

module.exports = mongoose.model('Role', roleSchema)