const mongoose = require('mongoose')

const panelSchema = mongoose.Schema({
        name: {
            type: String,
            required: [true, 'Please add a name']
        },
        staff: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'User'
            }
        ],
        groups: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Group'
            }
        ]
    })

module.exports = mongoose.model('Panel', panelSchema)