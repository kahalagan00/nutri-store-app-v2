const mongoose = require('mongoose');
const slugify = require('slugify');
const { trim } = require('validator');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'A user must have a full name specified'],
    unique: true,
  },
  email: {
    type: String,
    required: [true, 'A user needs a specified email address'],
  },
  password: {
    type: String,
    required: [true, 'Please provide a password for the user'],
    minLength: 12, // Optimal security, Maximum security = 15 or 16
    select: false,
    unique: true,
  },
  image: {
    type: String,
    required: [true, 'The user must have a picture'],
  },
  dateOfBirth: {

  },
  height: {
   
  },
  weight: {

  },
  symptoms: {

  },
  paymentInfo: {

  },
  cart: {

  }
  slug: String,
});

// DOCUMENT MIDDLEWARE
// runs before .save() and .create()
userSchema.pre('save', function (next) {
  // Converts the user name into lowercase and separates them
  // by dashes
  this.slug = slugify(this.name, { lower: true });
  next();
});

const User = mongoose.model('User', userSchema);

module.exports = User;
