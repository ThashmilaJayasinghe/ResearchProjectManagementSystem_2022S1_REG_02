// special package to handle express async errors
const asyncHandler = require('express-async-handler')

const Role = require('../models/roleModel')
const User = require('../models/userModel')
const Goal = require("../models/goalModel");


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
// @route   PUT /api/admin/allocateRole/:staffid
// @access  Private
const allocateRole = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.staffid)

    // check for user
    if(!user) {
        res.status(401)
        throw new Error('User not found')
    }

    user.roles.push(req.body.roles);
    user.save();

    const allocatedUser = await User.findByIdAndUpdate(req.params.staffid, user)

    res.status(200).json(allocatedUser)
})


module.exports = {
    addRole,
    allocateRole,
}