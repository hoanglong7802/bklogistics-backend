const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    maxLength: 100,
  },
  price: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
    maxLength: 250,
  },
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
