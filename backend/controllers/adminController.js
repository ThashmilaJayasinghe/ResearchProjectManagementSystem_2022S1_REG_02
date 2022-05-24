const Role = require('../models/roleModel')
const User = require('../models/userModel')
const SubmissionType = require('../models/submissionTypeModel')
const Multer = require("multer");
const Goal = require("../models/goalModel");


//define storage for the images using Multer
const storage = Multer.diskStorage({

    destination: (req, file, callback) => {

        callback(null, "../frontend/public/Requested_Ads/");

    },

    //add back extension
    filename: (req, file, callback) => {
        callback(null, Date.now() + file.originalname);
    }

});


//upload parameters for Multer
const upload = Multer({

    storage: storage,

    fileFilter: (req, file, callback) => {
        var path = require('path');
        var ext = path.extname(file.originalname);
        if(ext !== '.png' && ext !== '.jpg' && ext !== '.jpeg') {
            return callback(new Error('Only images are allowed'))
        }
        callback(null, true)
    },

    limits: {
        fieldSize: 1024 * 1024 * 3,
    }
});


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


// @desc    Add assignment
// @route   POST /api/admin/addAssignment
// @access  Private
const addAssignment = async (req, res) => {

    const{title, type, instructions, dueDate, markingScheme, template} = req.body
    // const image =  req.file.filename;

    if(!title || !type || !instructions || !dueDate || !markingScheme || !template) {
        return res.status(400).json({ msg: 'Please add all fields'})
    }

    const subType = await SubmissionType.create({
        title,
        type,
        instructions,
        dueDate,
        markingScheme,
        template

    })

    if(subType) {
        res.status(200).json(subType)
    } else {
        return res.status(404).json({ msg: 'No submission type created'})
    }
}




module.exports = {
    addRole,
    allocateRole,
    getStaff,
    addAssignment,
}