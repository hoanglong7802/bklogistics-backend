const mongoose = require("mongoose");

const requestSchema = new mongoose.Schema({
	walletAddress: {
		type: String,
		unique: true,
	},
	companyName: {
		type: String,
		required: true,
	},
	email: {
		type: String,
	},
	shippingAddress: {
		type: String,
	},
	deliveryAddress: {
		type: String,
	},
	phoneNumber: {
		type: String,
	},
	profileImage: {
		type: String,
	},
	website: {
		type: String,
	},
	haveSBT: {
		type: Boolean,
		default: false,
	},
	status: {
		type: String,
		enum: ["pending", "verified", "rejected"],
		default: "pending",
	},
	description: {
		type: String,
	},
	registerDate: {
		type: Date,
		default: Date.now,
	},
	chainId: {
		type: Number,
		required: true,
	},
});

const Request = mongoose.model("Request", requestSchema);

module.exports = Request;
