const mongoose = require('mongoose')

const panelSchema = mongoose.Schema({

    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'User'
    },


})

module.exports = mongoose.model('Panel', pannelSchema)