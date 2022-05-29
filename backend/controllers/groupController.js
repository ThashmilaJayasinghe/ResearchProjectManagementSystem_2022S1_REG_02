const Group = require('../models/groupModel');
const Student = require('../models/studentModel');

const create_group = (req, res) => {
	const subMemberRegNumber = req.body.subMemberRegNumber;
	const groupName = req.body.groupName;
	console.log(subMemberRegNumber);
	const newGroup = new Group({
		subMemberRegNumber,
		groupName,
		members: [],
	});
	console.log(newGroup);
	newGroup
		.save()
		.then(() => {
			console.log(newGroup.subMemberRegNumber);
			res.json(newGroup);
		})
		.catch((err) => {
			console.log(err);
		});
};

const get_Group = async (req, res) => {
	let id = req.params.id;
	console.log(id);
	let student = await Student.findOne({ user: id });
	const regNum = student.regNumber;
	console.log(regNum);
	const group = await Group.findOne({ 'members.regNumber': regNum });
	const gid = group._id.toString();
	console.log(gid);

	Group.findById({ _id: gid }).then((Group) => {
		console.log(Group);
		res.send(Group);
	});
};

const set_group = async (req, res) => {
	const subMemberRegNumber = req.body.temp;
	console.log(subMemberRegNumber);
	let sID = await Group.findOne({ subMemberRegNumber: subMemberRegNumber });
	console.log(sID);
	const gid = sID._id.toString();
	console.log(gid);

	const groupID = gid;
	// const groupID = '628fa6810eb6ae254b3895a4';
	const regNumber = req.body.regNumber;
	const leader = req.body.leader;
	const email = req.body.email;

	let group = await Group.findById(groupID);
	console.log(group);

	let i = group.members.length;
	console.log(i);
	try {
		if (group) {
			if (i < 4) {
				group.members.push({ regNumber, leader, email });
				group = await group.save();
				return res.status(200).send('Member is Added');
			} else {
				console.log('Limitted ' + i);
				res.status(500).send('Limit exceded');
			}
		} else {
			const Group = new Group({
				groupID,
				members: [
					{
						regNumber,
						leader,
						email,
					},
				],
			});

			Group.save()
				.then(() => {
					res.json('Members are added');
				})
				.catch((err) => {
					console.log(err);
				});
		}
	} catch (err) {
		console.log(err);
		res.status(500).send('Something went wrong');
	}
};

const update_group = (req, res) => {};

module.exports = { set_group, create_group, get_Group };
