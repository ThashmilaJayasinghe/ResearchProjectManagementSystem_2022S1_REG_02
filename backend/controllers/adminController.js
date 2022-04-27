// special package to handle express async errors
const asyncHandler = require('express-async-handler')

const Role = require('../models/roleModel')
const User = require('../models/userModel')


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


// @desc    Allocate role
// @route   PUT /api/users/role
// @access  Private
const allocateRole = asyncHandler(async (req, res) => {
    const user = await User.findById(req.body.id)

    // check for user
    if(!user) {
        res.status(401)
        throw new Error('User not found')
    }

    const allocatedUser = await User.findByIdAndUpdate(user.id,{
        roles: req.body.roles,
    })

    res.status(200).json(allocatedUser)
})


module.exports = {
    addRole,
    allocateRole,
}