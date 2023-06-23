const mongoose = require('mongoose');

const shipmentSchema = new mongoose.Schema({
  orderId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  sender: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Profile',
    required: true,
  },
  carrier: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Profile',
    required: true,
  },
  receiver: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Profile',
    required: true,
  },
  pickup_date: {
    type: Date,
    required: true,
  },
  delivery_date: {
    type: Date,
    required: true,
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
