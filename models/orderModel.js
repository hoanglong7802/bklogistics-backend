const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  id: {
    type: Number,
    auto: true,
    unique: true,
  },
  address: {
    type: String,
    required: true,
  },
  suppliers: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Profile',
      required: true,
    },
  ],
  manufacturers: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Profile',
      required: true,
    },
  ],
  date: {
    type: Date,
    default: Date.now,
  },
  status: {
    type: Number,
    enum: [0, 1, 2, 3, 4, 5],
    default: 0,
  },
});

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;
