const mongoose = require('mongoose');

const placeSchema = new mongoose.Schema({
  state: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  tourPlaces: {
    type: [String],
    required: true
  }
});

module.exports = mongoose.model('Place', placeSchema);
