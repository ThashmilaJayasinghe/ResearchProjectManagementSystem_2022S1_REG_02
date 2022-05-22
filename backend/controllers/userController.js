// Used to authenticate user
const jwt = require('jsonwebtoken')

// Used to hash password
const bcrypt = require('bcryptjs')

const User = require('../models/userModel')
const asyncHandler = require("express-async-handler");
const Goal = require("../models/goalModel");

// @desc    Register new user
// @route   POST /api/users
// @access  Public
const registerUser = async (req, res) => {
    const{name, email, password, role} = req.body

    if(!name || !email || !password || !role) {
        return res.status(400).json({ msg: 'Please add all fields'})
    }

    // Check if user exists
    const userExists = await User.findOne({email})

    if(userExists) {
        return res.status(400).json({ msg: 'User already exists'})
    }

    // Hash password
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    // Create user
    const user = await User.create({
        name,
        email,
        password: hashedPassword,
        roles: [role]
    })


    if(user) {
        res.status(201).json({
            _id: user.id,
            name: user.name,
            email: user.email,
            roles: user.roles,
            token: generateToken(user._id)
        })
    } else {
        return res.status(400).json({ msg: 'Invalid user data'})
    }

}

// @desc    Authenticate a user
// @route   POST /api/users/login
// @access  Public
const loginUser = async (req, res) => {
    const{email, password} = req.body

    // Check for user email
    const user = await User.findOne({email})

    if(user && (await bcrypt.compare(password, user.password))) {

        res.json({
            _id: user.id,
            name: user.name,
            email: user.email,
            roles: user.roles,
            token: generateToken(user._id)
        })
    } else {
        return res.status(400).json({ msg: 'Invalid credentials'})
    }
}

// @desc    Get user data
// @route   GET /api/users/me
// @access  Private
const getMe = async (req, res) => {
    const {_id, name, email} = await User.findById(req.user.id)

    res.status(200).json({
        id:_id,
        name,
        email,
        roles
    })
}

// @desc    Get all user data
// @route   GET /api/users/all
// @access  Private
const getAll = async (req, res) => {

    const users = await User.find()

    if(users) {
        res.status(200).json(users)
    } else {
        return res.status(404).json({ msg: 'No users to display'})
    }
}


// @desc    Get all staff data
// @route   GET /api/users/staff
// @access  Private
const getStaff = async (req, res) => {

    const staff = await User.find({roles:'staff'})

    if(staff) {
        res.status(200).json(staff)
    } else {
        return res.status(404).json({ msg: 'No staff to display'})
    }
}


// @desc    Delete user
// @route   DELETE /api/users/:id
// @access  Private
const deleteUser = async (req, res) => {

    await User.findByIdAndDelete(req.params.id).then(() => {
        res.status(200).json("User deleted");
    }).catch((err) => {
        console.log(err);
    })

}



// Generate JWT with id as token payload
const generateToken = (id) => {
    return jwt.sign({id}, process.env.JWT_SECRET, {
        expiresIn: '30d',
    })
}


module.exports = {
    registerUser,
    loginUser,
    getMe,
    getAll,
    getStaff,
    deleteUser,
}