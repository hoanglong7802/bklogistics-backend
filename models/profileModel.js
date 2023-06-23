const mongoose = require("mongoose");

const profileSchema = new mongoose.Schema({
	walletAddress: {
		type: String,
		unique: true,
	},
	companyName: {
		type: String,
		require: true,
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
	description: {
		type: String,
	},
	listedMaterials: [
		{
			materialId: {
				type: Number,
			}
		},
	],
	listedProducts: [
		{
			productId: {
				type: Number,
			}
		},
	],
	registerDate: {
		type: Date,
		default: Date.now,
	},
	chainId: {
		type: Number,
		required: true,
	  },
});

const Profile = mongoose.model("Profile", profileSchema);

module.exports = Profile;
