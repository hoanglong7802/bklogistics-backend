const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  id: {
    type: Number,
    auto:true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
  },
  material: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Material',
    },
  ],
  description: {
    type: String,
  },
  price: {
    type: Number,
    required: true,
  },
  unit: {
    type: String,
    enum: ['kg', 'm', 'cái'],
    required: true,
  },
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
