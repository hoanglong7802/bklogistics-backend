const mongoose = require('mongoose');

const materialSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  unit: {
    type: String,
    enum: ['kg', 'm'], // Add other possible values as needed
    required: true,
  },
});

const Material = mongoose.model('Material', materialSchema);

module.exports = Material;
