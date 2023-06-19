const mongoose = require('mongoose');

const profileSchema = new mongoose.Schema({
  wallet_address: {
    type: String,
    unique: true
  },
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String
  },
  contact_address: {
    type: String
  },
  phone_number: {
    type: Number
  },
  listed_materials: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Material',
    },
  ],
  listed_products: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product',
    },
  ],
  registerDate: {
    type: Date,
    default: Date.now,
  },
});

const Profile = mongoose.model('Profile', profileSchema);

module.exports = Profile;
