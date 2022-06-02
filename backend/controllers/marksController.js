const grp_mark = require('../models/MarkModel');
const Group = require('../models/groupModel');
const Student = require('../models/studentModel');

const get_Marks = async (req, res) => {
	grp_mark
		.find()
		.then((marks) => {
			res.json({ success: true, existingPost: marks });
		})
		.catch((err) => {
			console.log(err);
		});
};

const add_Mark = async (req, res) => {
	const grp_ID = req.body.grp_ID;
	const submission = req.body.submission;
	const submissionType = req.body.submissionType;
	const mark = req.body.mark;
	const evaluator_ID = req.body.evaluator_ID;

	let group = await grp_mark.findOne({ grp_ID });

	try {
		if (group) {
			console.log(`Found group : ${grp_ID}`);
			group.submissions.push({
				submission,
				submissionType,
				mark,
				evaluator_ID,
			});
			group = await group.save();
			return res.status(201).send(group);
		} else {
			const newMarks = await new grp_mark({
				grp_ID,
				submissions: [
					{
						submission,
						submissionType,
						mark,
						evaluator_ID,
					},
				],
			});

			newMarks
				.save()
				.then(() => {
					res.json('Group marks added!');
				})
				.catch((err) => {
					console.log(err);
				});
		}
	} catch (err) {
		console.log(err);
		res.status(500).send('Something get wrong when adding group marks');
	}
};

const get_group_mark = async (req, res) => {
	let id = req.params.id;
	// console.log(id);
	let student = await Student.findOne({ user: id });
	const regNum = student.regNumber;
	// console.log(regNum);
	const group = await Group.findOne({ 'members.regNumber': regNum });
	const gid = group._id.toString();

	// console.log(gid);
	grp_mark
		.find({ grp_ID: gid })
		.then((grp_mark) => {
			res.json(grp_mark);
		})
		.catch((err) => {
			console.log(err);
		});
};

module.exports = {
	get_Marks,
	add_Mark,
	get_group_mark,
};
