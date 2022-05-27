const Group = require('../models/groupModel');

const create_group = (req, res) => {
	const subMemberRegNumber = req.body.subMemberRegNumber;
	console.log(subMemberRegNumber);
	const newGroup = new Group({
		subMemberRegNumber,
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

// const get_id = async (req, res) => {
// 	const subMemberRegNumber = req.body.subMemberRegNumber;
// 	Group.findOne({ subMemberRegNumber: subMemberRegNumber }).then((Group) => {
// 		console.log(Group);
// 		res.send(Group);
// 	});
// };

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
				return res.status(201).send(group);
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

module.exports = { set_group, create_group };
