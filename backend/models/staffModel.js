const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const staffSchema = new Schema({
	user: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User',
	},
	name: {
		type: String,
		required: true,
	},
	email: {
		type: String,
		required: [true, 'Please enter an email'],
		unique: true,
		lowercase: true,
	},
	qualifications: [
		{
			type: String,
		},
	],
	researchInterests: [
		{
			type: String,
			default: undefined,
		},
	],
});
const Staff = mongoose.model('Staff', staffSchema);
module.exports = Staff;
