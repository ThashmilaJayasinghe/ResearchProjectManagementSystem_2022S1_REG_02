const mongoose = require('mongoose');

const submissionSchema = mongoose.Schema({
	groupId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Group',
	},
	submissionstitle: {
		type: String,
	},
	document: {
		type: String,
	},
	file_path: {
		type: String,
	},
	file_mimetype: {
		type: String,
	},
	type: {
		type: String,
	},
	supervisorID: {
		type: String,
	},
	coSupervisorID: {
		type: String,
	},
	panelID: {
		type: String,
	},
	subimit_Date: {
		type: Date,
		default: Date.now(),
	},
	status: {
		type: String,
	},
});

module.exports = mongoose.model('Submissions', submissionSchema);
