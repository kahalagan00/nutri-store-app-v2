import express from 'express';
import {
  getAllProducts,
  getProduct,
  createProduct,
} from '../controllers/productController';
import { protect, restrictTo } from '../controllers/authController';

const router = express.Router();

// Protect all the routes that follows below
router.use(protect);

// Only admins can modify products
router.use(restrictTo('admin'));
router.route('/').get(getAllProducts).post(createProduct);
router.route('/:id').get(getProduct);

export default router;
