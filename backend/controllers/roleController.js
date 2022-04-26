// special package to handle express async errors
const asyncHandler = require('express-async-handler')

const Role = require('../models/roleModel')


// @desc    Add role
// @route   POST /api/roles
// @access  Private
const addRole = asyncHandler(async (req, res) => {
    if(!req.body.name) {
        res.status(400)
        throw new Error('Please add role')
    }

    const role = await Role.create({
        name: req.body.name,
    })

    res.status(200).json(role)
})


module.exports = {
    addRole,
}