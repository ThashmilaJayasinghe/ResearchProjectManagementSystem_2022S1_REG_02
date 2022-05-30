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

module.exports.getAllSupervisors = asyncHandler(async (req, res) => {
	Staff.find()
		.then((supervisor) => {
			res.json(supervisor);
		})
		.catch((err) => {
			console.log(err);
		});
});
