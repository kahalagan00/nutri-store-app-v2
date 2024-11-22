import mongoose from 'mongoose';
import slugify from 'slugify';
import { trim } from 'validator';

// Define the interface for the User
interface ICart extends mongoose.Document {
  totalPrice: number;
  userId: typeof mongoose.Schema.ObjectId;
  cartItems: {
    productId: typeof mongoose.Schema.ObjectId;
    name: String;
    price: number;
    quantity: Number;
  };
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
  userId: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: [true, 'A cart must belong to a user'],
    select: true,
  },
  cartItems: [
    // Items added to cart will be updated/pushed here in this array
    {
      type: {
        productId: mongoose.Schema.ObjectId,
        name: String,
        price: Number,
        quantity: Number,
      },
    },
  ],
});

const Cart = mongoose.model('Cart', cartSchema);

export default Cart;
