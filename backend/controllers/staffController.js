const Staff = require('../models/staffModel');
const asyncHandler = require('express-async-handler');

// add supervisor to the database

module.exports.addStaff = asyncHandler(async (req, res) => {
	const data = req.body;
	const { user, name, email, qualifications, researchInterests } = data;
	console.log(data);
	try {
		const result = await Staff.create({
			user,
			name,
			email,
			qualifications,
			researchInterests,
		});
		res.status(200).json(result);
	} catch (err) {
		console.log(err);
	}
});

//update the qualifications of supervisor 
const addQualifications = asyncHandler(async(req, res) => {

    const newQualification = req.body.qualifications;
    const email = req.body.email;

    try{
        const updateResult = await Staff.findOneAndUpdate({email:email},{ $push : {qualifications: newQualification}})
        res.status(200).json(updateResult)
    }catch(err){
        console.log(err)
    }
}) 

//update the research field of supervisor 
const addResearchField = asyncHandler(async(req, res) => {

    const newResearchFeild = req.body.researchInterests;
    const email = req.body.email;

    try{
        const updateResult = await Staff.findOneAndUpdate({email:email},{ $push : {researchInterests: newResearchFeild}})
        res.status(200).json(updateResult)
    }catch(err){
        console.log(err)
    }
}) 

// get staff details
const getStaffDetails = asyncHandler(async(req, res) => {

    // const email = req.body.email;
    const email = req.query.email;

    try{
        const result = await Staff.find({email})
        res.status(200).json(result)
    }catch(err){
        console.log(err)
        res.json(err)
    }
})

// remove qualifications
const removeQualifications = asyncHandler(async(req, res) => {
    
    const email = req.body.email;
    // const indexValue = req.body.IndexVal;
    const arrVal = req.body.value;

    try{
        const deleteVal = await Staff.findOneAndUpdate({email: email}, 
            {
                $pull: { qualifications: arrVal }
            }
        )
        res.status(200).json(deleteVal)
    }
    catch(err){
        console.log(err)
        res.json(err)
    }
})

const removeResearchInterests = asyncHandler(async(req, res) => {
    
    const email = req.body.email;
    // const indexValue = req.body.IndexVal;
    const arrVal = req.body.value;

    try{
        const deleteVal = await Staff.findOneAndUpdate({email: email}, 
            {
                $pull: { researchInterests: arrVal }
            }
        )
        res.status(200).json(deleteVal)
    }
    catch(err){
        console.log(err)
        res.json(err)
    }
})

module.exports.addQualifications = addQualifications
module.exports.addResearchField = addResearchField
module.exports.getStaffDetails = getStaffDetails
module.exports.removeQualifications = removeQualifications
module.exports.removeResearchInterests = removeResearchInterests
