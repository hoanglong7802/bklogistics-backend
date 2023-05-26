const mongoose = require('mongoose');

const profileSchema = new mongoose.Schema({
  address: {
    type: String,
    required: true,
    maxLength: 100,
  },
  name: {
    type: String,
    required: true,
    maxLength: 100,
  },
  isMember: {
    type: Boolean,
    default: false,
  },
  mail: {
    type: String,
    required: true,
  },
  registerDate: {
    type: Date,
    default: Date.now,
  },
  materialSupply: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Material',
  }],
  productManufacture: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
  }],
});

const Profile = mongoose.model('Profile', profileSchema);

module.exports = Profile;
