const Role = require('../models/roleModel')
const User = require('../models/userModel')


// @desc    Add role
// @route   POST /api/admin/addRole
// @access  Private
const addRole = async (req, res) => {
    if(!req.body.name) {
        return res.status(400).json({ msg: 'Please add role'})
    }

    const role = await Role.create({
        name: req.body.name,
    })

    res.status(200).json(role)
}


// @desc    Allocate role
// @route   PUT /api/admin/allocateRole/:staffid
// @access  Private
const allocateRole = async (req, res) => {
    const user = await User.findById(req.params.staffid)

    // check for user
    if(!user) {
        return res.status(401).json({ msg: 'User not found'})
    }

    user.roles.push(req.body.roles);
    user.save();

    const allocatedUser = await User.findByIdAndUpdate(req.params.staffid, user)

    res.status(200).json(allocatedUser)
}


// @desc    Get all staff data
// @route   GET /api/admin/staff
// @access  Private
const getStaff = async (req, res) => {

    const staff = await User.find({roles:'staff'})

    if(staff) {
        res.status(200).json(staff)
    } else {
        return res.status(404).json({ msg: 'No staff to display'})
    }
}




module.exports = {
    addRole,
    allocateRole,
    getStaff,
}