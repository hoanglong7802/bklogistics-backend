const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
	productId: {
		type: Number,
		required: true,
	},
	name: {
		type: String,
		required: true,
	},
	description: {
		type: String,
	},
	required_materials: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "Material",
	},
	chainId: {
		type: Number,
		required: true,
	},
});

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
