const mongoose = require("mongoose");

const profileSchema = new mongoose.Schema({
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
	image: {
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
		type: Number,
	},
	profileImage: {
		type: String,
	},
	website: {
		type: String,
	},
	description: {
		type: String,
	},
	listedMaterials: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: "Material",
		},
	],
	listedProducts: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: "Product",
		},
	],
	registerDate: {
		type: Date,
		default: Date.now,
	},
});

const Profile = mongoose.model("Profile", profileSchema);

module.exports = Profile;
