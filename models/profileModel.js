const mongoose = require("mongoose");

const profileSchema = new mongoose.Schema({
	walletAddress: {
		type: String,
	},
	companyName: {
		type: String,
	},
	email: {
		type: String,
	},
	profileImage: {
		type: String,
	},
	website: {
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
	description: {
		type: String,
	},
	listedMaterials: [
		{
			materialId: {
				type: Number,
			},
		},
	],
	listedProducts: [
		{
			productId: {
				type: Number,
			},
		},
	],
	registerDate: {
		type: Date,
		default: Date.now,
	},
});

const Profile = mongoose.model("Profile", profileSchema);

module.exports = Profile;
