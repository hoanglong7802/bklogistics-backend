const mongoose = require('mongoose');

const orderStakeholderSchema = new mongoose.Schema({
  address: {
    type: Number,
    required: true
  },
  role: {
    type: String,
  },
  supplier_material: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Material"
  }],
  manufacturer_product: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product"
  }],
  order_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Order" 
  },
  chainId: {
		type: Number,
		required: true,
	  },
});

const OrderStakeholder = mongoose.model('OrderStakeholder', orderStakeholderSchema);

module.exports = OrderStakeholder;