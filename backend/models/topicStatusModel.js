const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//topic status model
const topicStatusSchema = new Schema({
	grp_ID: {
		type: String,
		// required : true
	},
	panalID: {
		type: String,
	},
	title: {
		type: String,
		required: true,
	},
	message: {
		type: String,
	},
	status: {
		type: String,
		// required : true
	},
	feedback: {
		type: String,
	},
	evaluated_Date: {
		type: Date,
		default: Date.now,
	},
});
const topicStatus = mongoose.model('topicStatus', topicStatusSchema);
module.exports = topicStatus;
