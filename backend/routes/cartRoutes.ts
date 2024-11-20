import express from 'express';
import {
  getAllCarts,
  getCart,
  createCart,
  updateCart,
} from '../controllers/cartController';

import { protect } from '../controllers/authController';

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
router.route('/').get(getAllCarts);

router.route('/user/:id').post(protect, createCart);

router.route('/:id').get(getCart).patch(updateCart);

export default router;
