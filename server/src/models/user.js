const mongoose = require('mongoose');

const schema = mongoose.Schema({
	username: {
		type: String,
		required: true,
		minLength: 3,
	},
	passwordHash: {
		type: String,
		required: true,
		minLength: 3,
	},
	favoriteGenre: {
		type: String,
		required: true,
		minLength: 3,
	},
});

module.exports = mongoose.model('User', schema);
