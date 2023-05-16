const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    required: true,
  },
  supplierAddress: {
    type: String,
    required: true,
  },
  manufacturerAddress: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ['PENDING', 'SUPPLIED', 'DELIVERING', 'SUCCESS', 'CANCELLED'],
    default: 'PENDING',
  },
});

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;
