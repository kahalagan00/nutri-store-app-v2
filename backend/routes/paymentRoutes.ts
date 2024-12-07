import express from 'express';
import { protect } from '../controllers/authController';
import { createCheckoutSession } from '../controllers/paymentController';

const router = express.Router();

router.use(protect);
router.post('/create-checkout-session', createCheckoutSession);

export default router;
