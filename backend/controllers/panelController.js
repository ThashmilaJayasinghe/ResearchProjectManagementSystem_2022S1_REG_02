const Panel = require('../models/panelModel');
const Student = require('../models/studentModel');
const Group = require('../models/groupModel');
const User = require('../models/userModel');

const addPanel = async (req, res) => {
	const { name, staff1, staff2, staff3, group } = req.body;

	if (!name || !staff1 || !staff2 || !staff3 || !group) {
		return res.status(400).json({ msg: 'Please add all fields' });
	}

	const newPanel = await Panel.create({
		name,
		staff: [staff1, staff2, staff3],
		groups: [group],
	});

	if (newPanel) {
		res.status(200).json(newPanel);
	} else {
		res.status(404).json({ msg: 'No panels created' });
	}
};

const get_Group_Pannel = async (req, res) => {
	let id = req.params.id;
	console.log(id);
	let student = await Student.findOne({ user: id });
	const regNum = student.regNumber;
	console.log(regNum);
	const group = await Group.findOne({ 'members.regNumber': regNum });
	const gid = group._id.toString();
	console.log(gid);

	Panel.find({ groups: gid })
		.then((Panel) => {
			res.json(Panel);
		})
		.catch((err) => {
			console.log(err);
		});
};

module.exports = { addPanel, get_Group_Pannel };
