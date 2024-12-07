import express from 'express';
import {
  getAllCarts,
  getCart,
  createCart,
  updateCart,
  deleteCart,
  clearCart,
} from '../controllers/cartController';
import { protect, restrictTo } from '../controllers/authController';

const router = express.Router();

// Protect all the routes that follows below
router.use(protect);

router.post('/createCart', createCart);
router.route('/cart').get(getCart);
router.route('/updateCart').patch(updateCart);
router.route('/clear').patch(clearCart); // Empty items inside the Cart

// Only admins can get information about the users' carts
router.use(restrictTo('admin'));
router.route('/').get(getAllCarts);
router.route('/:id').delete(deleteCart); // Delete actual Cart Object

export default router;
