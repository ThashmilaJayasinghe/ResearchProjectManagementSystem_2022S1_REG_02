const topic = require('../models/topicStatusModel');
const Group = require('../models/groupModel');
const Student = require('../models/studentModel');
const Panal = require('../models/panelModel');
const Panel = require('../models/panelModel');
const { json } = require('express');
const multer = require('multer');
const path = require('path');
const requestSupervisor = require("../models/requestSupervisorModel");

module.exports.upload = multer({
	storage: multer.diskStorage({
		destination(req, file, callback) {
			callback(null, 'frontend/public/topicdoc');
		},

		filename(req, file, callback) {
			callback(null, file.originalname);
		},
	}),
	limits: {
		fileSize: 2000000,
	},
	fileFilter(req, file, callback) {
		const ext = path.extname(file.originalname);
		console.log(ext);

		if (
			ext !== '.ppt' &&
			ext !== '.pptx' &&
			ext !== '.doc' &&
			ext !== '.docx' &&
			ext !== '.pdf'
		) {
			return callback(
				new Error('Please upload a .ppt, .pptx, .doc or .docx file')
			);
		}
		callback(null, true);
	},
});

module.exports.get_topic_Status = (req, res) => {
	topic
		.find()
		.then((topics) => {
			res.json({ success: true, existingPost: topics });
		})
		.catch((err) => {
			console.log(err);
		});
};

module.exports.post_topic_Status = async (req, res) => {
	let id = req.params.id;
	console.log(id);
	let student = await Student.findOne({ user: id });
	const regNum = student.regNumber;
	console.log(regNum);
	const group = await Group.findOne({ 'members.regNumber': regNum });
	const gid = group._id.toString();
	console.log(gid);

	const grp_ID = gid;
	// const panalID = '629106cd2e08bfaa647de892';
	const panalID = req.body.panalID;
	const topicDocument = req.file.originalname;
	const title = req.body.title;
	const message = req.body.message;
	const status = req.body.status;
	const feedback = req.body.feedback;
	const evaluated_Date = req.body.evaluated_Date;

	// const panal = await Panal.findOne({ group: gid });
	// panalID = panal._id.toString();

	const newTopicS = new topic({
		grp_ID,
		panalID,
		topicDocument,
		title,
		message,
		status,
		feedback,
		evaluated_Date,
	});

	newTopicS
		.save()
		.then(() => {
			res.json('Topic Evaluated');
		})
		.catch((err) => {
			console.log(err);
		});
};

module.exports.update_topic_status = (req, res) => {
	let {
		grp_ID,
		title,
		message,
		supervisorID,
		coSupervisorID,
		status,
		feedback,
	} = req.body;

	const updateTopic = {
		grp_ID,
		title,
		message,
		supervisorID,
		coSupervisorID,
		status,
		feedback,
	};
	const update = topic
		.findByIdAndUpdate(grp_ID, updateTopic)
		.then(() => {
			res.status(200).send({
				status: 'Updated',
			});
		})
		.catch((err) => {
			console.log(err);
			res
				.status(200)
				.send({ status: 'error with updating data', error: err.message });
		});
};
// module.exports.update_item = (req,res) => {
//     let itemID = req.params.id;
//     const {title, description, price} = req.body;
//
//     const updatePost = {
//         title,
//         description,
//         price
//     };
//
//     const update = item.findByIdAndUpdate(itemID,updatePost)
//         .then(()=>{
//             res.status(200).send({
//                 status:'post updated'
//             });
//         }).catch((err)=>{
//             console.log(err);
//             res.status(200).send({status:'error with updating data', error:err.message});
//         })
// }
//
// module.exports.delete_item = (req,res) => {
//     let itemID = req.params.id;
//     item.findByIdAndDelete(itemID)
//         .then(() => {
//             res.status(200).send({ status: 'item deleted' });
//         })
//         .catch((err) => {
//             console.log(err.message);
//             res
//                 .status(500)
//                 .send({ status: 'Error with delete user', error: err.message });
//         });
// }

module.exports.get_Group_topic_Status = async (req, res) => {
	let id = req.params.id;
	// let id = '62910bfdaaed76cedd411ae3';
	console.log(id);
	let student = await Student.findOne({ user: id });
	const regNum = student.regNumber;
	console.log(regNum);
	const group = await Group.findOne({ 'members.regNumber': regNum });
	const gid = group._id.toString();
	console.log(gid);
	topic
		.find({grp_ID: gid})
		.then((topics) => {
			res.send( topics );
		})
		.catch((err) => {
			console.log(err);
		});
};
