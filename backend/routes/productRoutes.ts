import express from 'express';
import {
  getAllProducts,
  getProduct,
  createProduct,
} from '../controllers/productController';

const router = express.Router();

router.route('/').get(getAllProducts).post(createProduct);
router.route('/:id').get(getProduct);

export default router;
