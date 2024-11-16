const mongoose = require('mongoose');
const slugify = require('slugify');
const { trim } = require('validator');

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'A product must have a name'],
    unique: true,
  },
  purpose: {
    type: String,
    required: [true, 'The purpose of the product must be specified'],
  },
  image: {
    type: String,
    required: [true, 'The product must have a picture'],
  },
  grams: {
    type: Number,
    required: [true, 'The product must have a weight (grams)'],
  },
  matterType: {
    type: String,
    trim: true, // JMARDEBUG: What does this do? : Removes whitespaces from right and left
    required: [true, 'The product must specify their matter state'],
  },
  price: {
    type: Number,
    required: [true, 'The product must have a price'],
  },
  availability: {
    type: Boolean,
    default: true,
    required: [true, 'The availability of the product needs to be specified'],
  },
  stockQuantity: {
    type: Number,
    required: [true, 'The number of products in stock must be specified'],
  },
  warnings: [String],
  ingredients: [String],
  nutritionalFacts: {
    type: {
      calories: {
        type: Number,
      },
      carbohydrates: {
        type: Number,
      },
      protein: {
        type: Number,
      },
    },
  },
  slug: String,
});

// DOCUMENT MIDDLEWARE
// runs before .save() and .create()
productSchema.pre('save', function (next) {
  // Converts the product name into lowercase and separates them
  // by dashes
  this.slug = slugify(this.name, { lower: true });
  next();
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
