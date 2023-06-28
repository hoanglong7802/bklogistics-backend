const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  order_id: {
    type: Number,
    required: true,
  },
  product_id: {
    type: Number,
    required: true,
  },

  created_date: {
    type: Date,
    default: Date.now,
  },
  status: {
    type: Number,
    enum: [0, 1, 2, 3, 4, 5],
    //['PENDING', 'SUPPLIED', 'DELIVERING', 'SUCCESS', 'FAILED', 'CANCELLED']
    default: 0,
  },
  is_paid: {
    type: Boolean,
    default: false,
  },
  deposit_amount: {
    type: Number,
    default: 0,
  },
  customer_address: {
    type: String,
    require: true,
  },
  chainId: {
    type: Number,
    required: true,
  },

});

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;
