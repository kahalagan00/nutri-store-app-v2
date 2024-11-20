import mongoose from 'mongoose';
import slugify from 'slugify';
import { trim } from 'validator';

// Define the interface for the User
interface ICart extends mongoose.Document {
  totalPrice: number;
  user: typeof mongoose.Schema.ObjectId;
  products: (typeof mongoose.Schema.ObjectId)[];
}

const cartSchema = new mongoose.Schema<ICart>({
  totalPrice: {
    type: Number,
    default: 0,
    required: [
      true,
      'The total amount of all products in the cart need to be added.',
    ],
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: [true, 'A cart must belong to a user'],
    select: true,
  },
  products: [
    // Items added to cart will be updated/pushed here in this array
    {
      type: mongoose.Schema.ObjectId,
      ref: 'Product',
    },
  ],
});

const Cart = mongoose.model('Cart', cartSchema);

export default Cart;
