const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
	walletAddress: {
		type: String,
		required: true,
	},
	passwordHash: {
		type: String,
		required: true,
	},
	lastLogin: {
		type: Date,
	},
});

module.exports = mongoose.model("User", userSchema);
