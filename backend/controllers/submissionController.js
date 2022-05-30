const Group = require('../models/groupModel');
const Student = require('../models/studentModel');
const Submissions = require('../models/submissionModel');
const Panel = require('../models/panelModel');
const multer = require('multer');
const path = require('path');

const upload = multer({
	storage: multer.diskStorage({
		destination(req, file, callback) {
			callback(null, 'frontend/submissions');
		},

		filename(req, file, callback) {
			callback(null, Date.now() + file.originalname);
		},
	}),
	limits: {
		fileSize: 2000000,
	},
	fileFilter(req, file, callback) {
		const ext = path.extname(file.originalname);

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

const addSubmission = async (req, res) => {
	let id = req.params.id;
	console.log('user', id);
	let student = await Student.findOne({ user: id });
	const regNum = student.regNumber;
	console.log('user reg number', regNum);
	const group = await Group.findOne({ 'members.regNumber': regNum });
	const gid = group._id.toString();
	console.log('user group id', gid);
	const groupId = gid;
	const sID = group.supervisorID;
	const coSID = group.coSupervisorID;

	// const panel = await Panel.findOne({ groups: gid });
	// const pID = panel._id.toString();

	const type = req.body.type;
	if (type == 'document') {
		const submissionstitle = req.body.submissionstitle;
		const document = req.file.originalname;
		console.log(document);
		const path = req.file.path;
		const mimetype = req.file.mimetype;
		const submission = await new Submissions({
			groupId,
			submissionstitle,
			type,
			document,
			file_path: path,
			file_mimetype: mimetype,
			supervisorID: sID,
			coSupervisorID: coSID,
		});

		submission
			.save()
			.then(() => {
				res.json(submission);
			})
			.catch((err) => {
				console.log(err);
			});
	} else {
		const submissionstitle = req.body.submissionstitle;
		const document = req.file.filename;
		const path = req.file.path;
		const mimetype = req.file.mimetype;
		const submission = await new Submissions({
			groupId,
			submissionstitle,
			type,
			document,
			file_path: path,
			file_mimetype: mimetype,
			panelID: pID,
		});
		submission
			.save()
			.then(() => {
				res.json(submission);
			})
			.catch((err) => {
				console.log(err);
			});
	}
};

const get_Group_Submissions = async (req, res) => {
	let id = req.params.id;
	// console.log(id);
	let student = await Student.findOne({ user: id });
	const regNum = student.regNumber;
	// console.log(regNum);
	const group = await Group.findOne({ 'members.regNumber': regNum });
	const gid = group._id.toString();
	// console.log(gid);
	Submissions.find({ groupId: gid })
		.then((Submissions) => {
			res.json(Submissions);
		})
		.catch((err) => {
			console.log(err);
		});
};

const download = async (res, req) => {
	// const id = req.params.id;
	// console.log(id);
	Submissions.find({ _id: '62933ba3d096dabf2bbfffde' }),
		(err, data) => {
			if (err) {
				console.log(err);
			} else {
				var x = data.file_path;
				res.download(x);
			}
		};
};
module.exports = { upload, addSubmission, get_Group_Submissions, download };
