const mongoose = require('mongoose');

const shipmentSchema = new mongoose.Schema({
  orderId: {
    type: Number,
    required: true,
  },
  sender: {
    type: String,
    required: true,
  },
  carrier: {
    type: String,
    required: true,
  },
  receiver: {
    type: String,
    required: true,
  },
  create_date: {
    type: Number,
  },
  pickup_date: {
    type: Number,
    default: 0,
  },
  delivery_date: {
    type: Number,
    default: 0,
  },
  status: {
    type: Number,
    enum: [0, 1, 2], // Add other possible values as needed
    default: 0,
  },
  chainId: {
    type: Number,
    required: true,
  },
});

const Shipment = mongoose.model('Shipment', shipmentSchema);

module.exports = Shipment;
