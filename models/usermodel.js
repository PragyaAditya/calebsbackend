const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
  },
  number: {
    type: String,
    required: [true, 'Number is required'],
    match: [/^[0-9]{10}$/, 'Number must be 10 digits'],
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    match: [/.+@.+\..+/, 'Email must be valid'],
  },
  image: {
    type: String,
    default: '',
  },
});

const User = mongoose.model('User', userSchema);

module.exports = User;
