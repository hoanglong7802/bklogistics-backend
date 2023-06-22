const mongoose = required('mongoose');

const requiredMaterialSchema = new mongoose.Schema({
    material_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Material",
        required: true
    },
    product_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: true
    },
    quantity: {
        type: Number,
        required: true
    },
    unit: {
        type: String,
        enum: ["kg", "m", "pieces"],
    }
});

const RequiredMateral = mongoose.model("RequiredMaterial", requiredMaterialSchema);

module.exports = RequiredMaterial;