const mongoose = require("mongoose");

const materialSchema = new mongoose.Schema({
	materialId: {
		type: Number,
		required: true,
	},
	name: {
		type: String,
		required: true,
	},
	chainId: {
		type: Number,
		required: true,
	},
});

const Material = mongoose.model("Material", materialSchema);

module.exports = Material;
