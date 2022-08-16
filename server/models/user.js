const mongoose = require('mongoose');

const schema = mongoose.Schema({
	username: {
		type: String,
		required: true,
		minLength: 3,
	},
	password: {
		type: String,
		required: true,
		minLength: 6,
	},
});

module.exports = mongoose.model('User', schema);
