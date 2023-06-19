const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  product_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product"
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
  is_paid:{
    type: Boolean,
    default: false
  },
  deposit_amount: {
    type: Number
  },
  customer_address: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Profile"
  }
});

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;
