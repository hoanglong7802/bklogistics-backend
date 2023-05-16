const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    maxlength: 100
  },
  email: {
    type: String,
    required: true,
    maxlength: 100,
    unique: true
  },
  age: {
    type: Number,
    required: true
  }
});

const User = mongoose.model('User', userSchema);

module.exports = User;
