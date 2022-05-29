const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const groupSchema = new Schema({
	subMemberRegNumber: {
		type: String,
	},
	groupName: {
		type: String,
	},
	members: [
		{
			regNumber: {
				type: String,
			},
			leader: {
				type: Boolean,
				default: false,
			},
			email: {
				type: String,
				// required: [true,'Please enter an email'],
				// unique: true,
				// lowercase: true,
			},
		},
	],
	reg_Date: {
		type: Date,
		default: Date.now(),
	},
	// supervisor: {
	// 	type: mongoose.Schema.Types.ObjectId,
	// 	ref: 'Staff',
	// },
	supervisorID:{
	    type:String
	},
	coSupervisorID:{
	    type:String
	},
	// coSupervisor: {
	// 	type: mongoose.Schema.Types.ObjectId,
	// 	ref: 'Staff',
	// },
});

const Group = mongoose.model('Group', groupSchema);
module.exports = Group;
