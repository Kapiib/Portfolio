const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },
  role: {
    type: String,
    required: true,
    unique: false
  },
  password: {
    type: String,
    required: true
  }
}, { timestamps: true });

const User = mongoose.model('User', userSchema);
module.exports = User;