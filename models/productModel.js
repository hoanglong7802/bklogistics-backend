const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  required_materials: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Material"
  }
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
