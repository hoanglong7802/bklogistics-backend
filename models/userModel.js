const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    maxLength: 100,
  },
  email: {
    type: String,
    required: true,
    maxLength: 100,
  },
  age: {
    type: Number,
    required: true,
  },
  role: {
    type: String,
    enum: ['member', 'supplier', 'manufacturer', 'customer'],
    default: 'member',
  },
});

const User = mongoose.model('User', userSchema);

module.exports = User;
