const Group = require('../models/groupModel');
const Student = require('../models/studentModel');
const Submissions = require('../models/submissionModel');
const Panel = require('../models/panelModel');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const upload = multer({
	storage: multer.diskStorage({
		destination(req, file, callback) {
			callback(null, 'frontend/public/submissions');
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

	const panel = await Panel.findOne({ groups: gid });
	const pID = panel._id.toString();

	const type = req.body.type;
	if (type == 'document') {
		const submissionstitle = req.body.submissionstitle;
		const status = req.body.status;
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
			status,
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
		const status = req.body.status;
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
			status,
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

const delete_submission = async (req, res) => {
	let id = req.params.id;
	Submissions.findByIdAndDelete({ _id: id })
		.then(() => {
			res.json('Submition deleted');
		})
		.catch((err) => {
			console.log(err);
		});
};

const download = async (req, res) => {
	console.log('calling');
	// try {
	// 	const document = req.params.document;
	// 	const sPath = path.join(
	// 		__dirname,
	// 		'..',
	// 		'..',
	// 		'frontend/submissions',
	// 		document
	// 	);
	// 	var file = fs.createReadStream(sPath);
	// 	console.log(file);
	// 	file.pipe(res);
	// } catch (error) {
	// 	return res.status(400).json({
	// 		success: false,
	// 		error: error,
	// 	});
	// }

	// Submissions.findById({ _id: req.params.id }),
	// 	(err, data) => {
	// 		console.log(req.params.id);
	// 		if (err) {
	// 			console.log(err);
	// 		} else {
	// 			var x =
	// 				__dirname + '..' + '..' + 'frontend/submissions' + data[0].document;
	// 			res.download(x);
	// 		}
	// 	};

	try {
		const file = await Submissions.findById(req.params.id);
		res.set({
			'Content-Type': file.file_mimetype,
		});
		console.log(file);
		res.sendFile(path.join(__dirname, '..', '..', file.file_path));
	} catch (error) {
		res.json('Error while downloading file. Try again later.');
	}
};


// Get panel presentation evaluation
const get_Panel_Presentations = async (req, res) => {

	let userID = req.query.id;
	console.log(`Pannel member ID : ${userID}`)
	let getpanel = await Panel.findOne({'staff': userID})
	const panelID =  getpanel._id.toString();
	console.log(`panel ID ${panelID}`)

	const getPresentations = await Submissions.find({'panelID':panelID, type: "presentation", status: 'Pending'})

	try{
		if(getPresentations){
			return res.json(getPresentations)
		}
		else{
			console.log("Still, not presentations to evaluate")
		}
	}
	catch (err){
		console.log(err);
		res.status(500).send("Something get wrong when getting presentations")
	}
}

//get Supervisor documents
const get_Supervisor_documents = async (req, res) =>{

	let userID = req.query.id;
	console.log(`Supervisor ID : ${userID}`)


	const getDocuments = await Submissions.find({supervisorID:userID,status:"Pending"})

	try{
		if(getDocuments){
			return res.json(getDocuments)
		}
		else{
			console.log("Still, not submitted supervisor document")
		}
	}
	catch (err){
		console.log(err)
		res.status(500).send("Something get wrong when getting supervisor documents")
	}
}

//get Co-Supervisor documents
const get_co_Supervisor_Documents = async (req, res) =>{

	let userID = req.query.id;

	console.log(`co-supervisor ID : ${userID}`)

	const getCoDocuments = await Submissions.find({coSupervisorID:userID, status: "Pending"})

	try{
		if(getCoDocuments){
			return res.json(getCoDocuments)
		}
		else{
			console.log("Still, not submitted co-supervisor document")
		}
	}
	catch (err){
		console.log(err)
		res.status(500).send("Something get wrong when getting co-supervisor documents")
	}

}


//updateSubmission Status
const update_Submission_Status = async (req, res)=>{

	let submissionID = req.body.submissionID;
	const status = req.body.status;

	const updatedValue = await Submissions.findByIdAndUpdate(submissionID,{status:status})
	return res.status(201).json(updatedValue);

}



module.exports = {
	upload,
	addSubmission,
	get_Group_Submissions,
	download,
	delete_submission,
	update_Submission_Status,
	get_co_Supervisor_Documents,
	get_Supervisor_documents,
	get_Panel_Presentations
};

// try {
// 	const file = await Submissions.findById(req.params.id);
// 	res.set({
// 		'Content-Type': file.file_mimetype,
// 	});
// 	res.sendFile(path.join(__dirname, '..', file.file_path));
// } catch (error) {
// 	res.json('Error while downloading file. Try again later.');
// }
// Submissions.findById({ _id: req.params.id }),
// 	(err, data) => {
// 		if (err) {
// 			console.log(err);
// 		} else {
// 			var x = __dirname + '/submissions/' + data[0].document;
// 			res.download(x);
// 		}
// 	};
