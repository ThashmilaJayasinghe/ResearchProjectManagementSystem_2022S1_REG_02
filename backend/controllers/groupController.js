const Group = require('../models/groupModel');
const Staff = require('../models/staffModel');
const Student = require('../models/studentModel');
const Supervisor = require('../models/supervisorModel');

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


const update_group_supervisor = async(req, res) => {
	// const staffId = req.params.staffId;
	const staffId = req.body.supervisorID;
	const groudId = req.body.groupId;

	console.log(staffId)
	console.log(groudId)

	try{
		const updatedResult = await Group.findByIdAndUpdate(groudId, {supervisorID: staffId})
		res.status(200).json(updatedResult)
	}
	catch(err) {
		console.log(err);
	}
};

const update_group_coSupervisor = async(req, res) => {
	// const staffId = req.params.staffId;
	const staffId = req.body.coSupervisorID;
	const groudId = req.body.groupId;

	try{
		const updatedResult = await Group.findByIdAndUpdate(groudId, {coSupervisorID: staffId})
		res.status(200).json(updatedResult)
	}
	catch(err) {
		console.log(err);
	}
}

// get group leader, their supervisor and co-supervisor
const getGroupDetails = async(req, res) => {
	
	// const studentRegNumber = req.body.regNum;
	const studentRegNumber = req.query.regNum

	try{
		const groupDetails = await Group.findOne({subMemberRegNumber:studentRegNumber})

		if(groupDetails){
			const tempSupervisor = groupDetails.supervisorID;
			const tempCoSupervisor = groupDetails.coSupervisorID;
			const supervisor = await Staff.findOne({user:tempSupervisor})
			const coSupervisor = await Staff.findOne({user:tempCoSupervisor})

			if(supervisor && coSupervisor){
				const supervisorDetails = supervisor;
				const coSupervisorDetails = coSupervisor;
				res.status(200).json({groupDetails, supervisorDetails, coSupervisorDetails})
			}
			else if(supervisor || coSupervisor){
				if(supervisor){
					const supervisorDetails = supervisor;
					res.status(200).json({groupDetails, supervisorDetails})
				}
				if(coSupervisor){
					const coSupervisorDetails = coSupervisor;
					res.status(200).json({groupDetails, coSupervisorDetails})
				}
			}
			else{
				res.status(200).json(groupDetails)
			}
		}
		else{
			res.status(204).json(groupDetails)
		}
	}catch(err){
		console.log(err)
		res.status(501).json(err)
	}
}

module.exports = { set_group, create_group, get_Group, update_group_supervisor, update_group_coSupervisor, getGroupDetails};
