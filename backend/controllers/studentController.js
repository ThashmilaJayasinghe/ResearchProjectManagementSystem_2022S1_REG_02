const asyncHandler = require('express-async-handler');
const Student = require('../models/studentModel');
const User = require('../models/userModel');
const mongoose = require('mongoose');
const SubmissionType = require('../models/submissionTypeModel');
// const requestSupervisor = require('../models/requestSupervisorModel');

// const makeSupervisorRequest = asyncHandler(async (req, res) => {
//
//     try{
//         const result = await requestSupervisor.create({
//             requestedGroupID: req.body.groudID,
//             requestedGroup: req.body.group,
//             supervisorName: req.body.supervisorName ,
//             supervisorEmail:  req.body.supervisorEmail,
//             topic:  req.body.topic,
//             details:  req.body.details,
//             requestStates:  req.body.requestStates,
//             requestEvaluatedDate:  req.body.requestEvaluatedDate,
//         })
//
//         res.status(200).json(result)
//
//     }catch (err){
//         console.error(err)
//         console.log("Request not sent")
//     }
// })

module.exports.set_data = (req, res) => {
	const user = req.params.id;
	const regNumber = req.body.regNumber;

	if (user) {
		const student = new Student({
			user,
			regNumber,
		});

		student
			.save()
			.then(() => {
				res.json('student is added');
			})
			.catch((err) => {
				console.log(err);
			});
	} else {
		res.status(500).send('User is not there');
	}
};

module.exports.isAStudent = async (req, res) => {
	const email = req.params.email;
	console.log(email);
	const user = await User.findOne({ email: email });
	console.log(user);
	const id = user._id;
	await Student.findOne({ user: id })
		.then((Student) => {
			res.json(Student);
			console.log(Student);
		})
		.catch((err) => {
			console.log(err);
		});
};

module.exports.getAllFiles = async (req, res) => {
	SubmissionType.find()
		.then((SubmissionType) => {
			res.json(SubmissionType);
		})
		.catch((err) => {
			console.log(err);
		});
};

// module.exports.isAStudent = async (req, res) => {
// 	const id = req.params.id;
// 	Student.findOne({ user: id })
// 		.then((Student) => {
// 			res.json(Student);
// 		})
// 		.catch((err) => {
// 			console.log(err);
// 		});
// };
