import express from 'express';
import {
  getAllCarts,
  getCart,
  createCart,
  updateCart,
} from '../controllers/cartController';

import { protect, restrictTo } from '../controllers/authController';

const router = express.Router();

// POST request and cart creation should be triggered automatically
// after user logs in to the application
// Initial body for POST:
// {
//   {
//     "totalPrice": 0,
//     "user": `${userId}`,
//     "products": [],
// }
// }

// Protect all the routes that come after this
router.use(protect);

router.route('/user/:id').post(createCart);

router.route('/:id').get(getCart).patch(updateCart);

router.use(restrictTo('admin'));
router.route('/').get(getAllCarts);

export default router;
