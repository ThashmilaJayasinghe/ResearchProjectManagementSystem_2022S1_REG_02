const jwt = require('jsonwebtoken')
const User = require('../models/userModel')
const Role = require('../models/roleModel')

const protect = async (req, res, next) => {
    let token

    // HTTP header has an authorization object.
    // That is being checked below.
    // And we're checking for the word 'Bearer'
    // which is always followed by the token.
    // eg Bearer drgtergfge
    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try{
            // Get token from header
            token = req.headers.authorization.split(' ')[1]

            // Verify token
            const decoded = jwt.verify(token, process.env.JWT_SECRET)

            // Get user using id in the token payload
            req.user = await User.findById(decoded.id).select('-password')

            next()

        } catch (error) {
            console.log(error)
            res.status(401).json({ msg:'Not authorized'});
        }
    }

    if(!token) {
        return res.status(401).json({ msg: 'Not authorized, no token'});
    }
}

const authRole = (role) => {
    return async (req, res, next) => {
        // let auth = 0
        // if (req.user.roles.some(e => e === role)) {
        //     auth = 1
        //     next()
        // }
        //
        // if(!auth) {
        //     res.status(401)
        //     throw new Error('Not authorizeddd')
        //}

        const userRoles = await Role.findById(req.user.roles)
        // res.send(userRoles)
        if (userRoles.name !== role) {
            return res.status(401).json({ msg: 'Not authorized'});
        }

        next()
    }
}

// const aRole = (role) => {
//     return (req, res, next) => {
//         if(req.user.role !== role) {
//             res.status(401)
//             return res.send('Not authorized')
//         }
//
//         next()
//     }
// }


module.exports = {
    protect,
    authRole,
}