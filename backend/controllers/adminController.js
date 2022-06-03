const Role = require('../models/roleModel')
const User = require('../models/userModel')
const SubmissionType = require('../models/submissionTypeModel')
const Panel = require('../models/panelModel')
const Group = require('../models/groupModel')
const Multer = require("multer");
const path = require('path');


// define storage for Multer
const storage = Multer.diskStorage({

    destination: (req, file, callback) => {

        file.fieldname === 'markingScheme' ?
            callback(null, 'frontend/public/Marking_Schemes')
            : callback(null, 'frontend/public/Templates');

    },

    //add back extension
    filename: (req, file, callback) => {
        callback(null, Date.now() + file.originalname);
    }

});


// upload parameters for Multer
const upload = Multer({

    storage: storage,

    limits: {
        fileSize: 2000000
    },


    fileFilter: (req, file, callback) => {

        const ext = path.extname(file.originalname);

        if (file.fieldname === 'markingScheme') {
            if (ext !== '.doc' && ext !== '.docx' && ext !== '.pdf') {
                return callback(new Error('Please upload a .doc, .docx or .pdf file'))
            }
            callback(null, true);
        } else {
            if (ext !== '.ppt' && ext !== '.pptx' && ext !== '.doc' && ext !== '.docx') {
                return callback(new Error('Please upload a .ppt, .pptx, .doc or .docx file'))
            }
            callback(null, true);
        }

    },

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

// @desc    Get all student data
// @route   GET /api/admin/students
// @access  Private
const getStudents = async (req, res) => {

    const students = await User.find({roles:'student'})

    if(students) {
        res.status(200).json(students)
    } else {
        return res.status(404).json({ msg: 'No students to display'})
    }
}


// @desc    Add assignment
// @route   POST /api/admin/addAssignment
// @access  Private
const addAssignment = async (req, res) => {

    const{title, type, instructions, dueDate} = req.body
    const markingScheme =  req.files.markingScheme[0].filename;
    const template =  req.files.template[0].filename;

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
        res.status(404).json({ msg: 'No submission type created'})
    }
}

// @desc    Add panel
// @route   POST /api/admin/addPanel
// @access  Private
const addPanel = async (req, res) => {

    const{name, staff1, staff2, staff3, group} = req.body

    if(!name || !staff1 || !staff2 || !staff3 || !group) {
        return res.status(400).json({ msg: 'Please add all fields'})
    }

    const newPanel = await Panel.create({
        name,
        staff: [staff1, staff2, staff3],
        groups: [group]
    })

    if(newPanel) {
        res.status(200).json(newPanel)
    } else {
        res.status(404).json({ msg: 'No panels created'})
    }
}

// @desc    Get groups
// @route   GET /api/admin/groups
// @access  Private
const getGroups = async (req, res) => {

    const groups = await Group.find()

    if(groups) {
        res.status(200).json(groups)
    } else {
        res.status(404).json({ msg: 'No groups to display'})
    }

}


// @desc    Get all panel data
// @route   GET /api/admin/allPanels
// @access  Private
const getAllPanels = async (req, res) => {

    const panels = await Panel.find()
    const panelDetails = [];

    if(panels) {



        res.status(200).json(panels)
    } else {
        return res.status(404).json({ msg: 'No panels to display'})
    }
}


module.exports = {
    addRole,
    allocateRole,
    getStaff,
    getStudents,
    addAssignment,
    upload,
    addPanel,
    getGroups,
    getAllPanels
}