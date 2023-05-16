const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  product: {
    type: String,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
});

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;
